// @ts-check
const axios = require("axios").default;
const express = require("express");
const router = express.Router();
const { fs } = require("../utils/database/firebase");
const utils = require("../utils/index");

// const utils = require("../utils/index");

/**
 * Request for all package docs
 */
router.get("/", async (req, res) => {
  try {
    const start = (req.query.start && Number(req.query.start)) || 0;
    const end = (req.query.end && Number(req.query.end)) || 0;
    const pageSize = (req.query.pagesize && Number(req.query.pagesize)) || 20;
    const filterTS = req.query.since || null;
    const uid = req.query.uid || null;

    const packageMetaData = await utils.getMetaDataDocument("packages");
    const data = await utils.readCollection(
        // @ts-ignore
        uid,
        start,
        end,
        pageSize,
        filterTS,
    );

    if (data.status === "ok") {
      const packages = data.data;

      for (const p in packages) {
        if (packages[p]) {
          const package = packages[p];
          const uid = package.uid;
          const profileData = await utils.readProfileData(uid);
          data.data[p].userData = profileData;
        }
      }
    }

    data.totalPackageCount = packageMetaData && packageMetaData.count || 0;

    res.status(200);
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(400);
    res.json({
      status: "error",
      statusText: err.message,
    });
  }
});

/**
 *
 */
router.post("/submit", async (req, res, next) => {
  try {
    if (!req.body) {
      throw new Error("No Payload Provided");
    }

    if (!req.body.uid) {
      throw new Error("No User ID Provided");
    }

    if (!req.body.provider || req.body.provider === "unknown") {
      throw new Error("No Git Provider");
    }

    if (!req.body.packageURL) {
      throw new Error("No Package Provided");
    }

    const { provider, packageURL, uid } = req.body;

    const doesPackageExist = async () => {
      // console.log(packageURL)
      const snapshot = await fs
          .collection("packages")
          .where("repositoryLink", "==", packageURL)
          .get();

      return !snapshot.empty;
    };

    let getRepository;
    let getRepositoryResponse;
    let cleanPackageURL;
    let checkRepository;
    let deployArray;
    let owner;
    let repository;
    let gitPackageJSONFile;
    let packageJSONRequest;
    let packageJSON;
    let packageData;
    let data;

    let checkPackage = await doesPackageExist();

    const createdAt = new Date();
    const createdAtOut = createdAt.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const createdAtTS = createdAt.getTime();

    if (!checkPackage) {
      if (provider === "github") {
        cleanPackageURL = packageURL.replace(/^\/\/|^.*?:(\/\/)?/, "");
        deployArray = cleanPackageURL.split("/");
        owner = deployArray[1];
        repository =
          deployArray[2].indexOf(".") === -1 ?
            deployArray[2] :
            deployArray[2].substring(0, deployArray[2].indexOf("."));

        checkRepository = await axios.get(
            `https://api.github.com/repos/${owner}/${repository}`,
        );

        if (
          checkRepository &&
          Object.prototype.hasOwnProperty.call(checkRepository, "message") &&
          // @ts-ignore
          checkRepository.message === "Not Found"
        ) {
          throw new Error(
              `${packageURL} cannot be found or is a private repository`,
          );
        }

        getRepository = await axios.get(
            `https://api.github.com/repos/${owner}/${repository}/contents/`,
        );

        if (getRepository.status !== 200) {
          throw new Error(getRepository.statusText);
        }

        getRepositoryResponse = getRepository.data;
        gitPackageJSONFile = getRepositoryResponse.find(
            (file) => file.name === "package.manifest.json",
        );

        if (gitPackageJSONFile) {
          packageJSONRequest = await axios.get(gitPackageJSONFile.download_url);

          packageJSON = packageJSONRequest.data;

          packageData = {
            id: packageJSON.name,
            version: packageJSON.version,
            description: packageJSON.description,
            tags: packageJSON.tags,
            uid,
            owner,
            repository,
            installLink: gitPackageJSONFile.url,
            repositoryLink: packageURL,
            createdAt: createdAtOut,
            createdAtTS,
          };

          await fs.collection("packages").doc(packageData.id).set(packageData);

          // await utils.incrementMetaDataCount('packages');

          // const packageName = packageData.id;
          // for (let i = 0; i < 60; i++) {
          //   packageData.id = `${packageName}_${i}`;

          await fs
              .collection("packages")
              .doc(packageData.id)
              .set(packageData);

          await utils.incrementMetaDataCount("packages");

          //   packageData.id = packageName;
          // }

          checkPackage = await doesPackageExist();
          if (checkPackage) {
            data = {
              status: "ok",
              statusText: `${packageData.id} has been saved.`,
            };
          } else {
            data = {
              status: "error",
              statusText: `There was an error saving ${packageData.id}.`,
            };
          }
        } else {
          data = {
            status: "error",
            statusText: `${packageURL} does not have a bldr package file.`,
          };
        }
      }
    } else {
      data = {
        status: "error",
        statusText: `A package already exists for ${packageURL}`,
      };
    }

    res.status(200);
    res.json(data);
  } catch (err) {
    err.message;

    const message = err && err.response && err.response.statusText;
    const statusText =
      message === "Not Found" ?
        "Repository cannot be found or may be private." :
        err.message;

    next({
      status: "error",
      statusCode: 400,
      statusText,
    });
  }
});

module.exports = router;
