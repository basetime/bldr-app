// @ts-check
const axios = require('axios').default
const express = require("express");
const router = express.Router();
const { fs } = require("../utils/database/firebase");
const utils = require("../utils/index")

// const utils = require("../utils/index");



/**
 * Request for all organization metadata
 */
// router.get("/", async function (req, res) {
//   try {
//     let start = (req.query.start && Number(req.query.start)) || 0;
//     let end = (req.query.end && Number(req.query.end)) || 0;
//     let pageSize = (req.query.pagesize && Number(req.query.pagesize)) || 20;
//     let filterTS = (req.query.since && Number(req.query.since)) || null;

//     const data = await ins.readCollection(
//       organizationId,
//       collection_id,
//       start,
//       end,
//       pageSize,
//       filterTS
//     );

//     res.status(200);
//     res.json(data);
//   } catch (err) {
//     console.log(err);
//     res.status(400);
//     res.json({
//       status: "error",
//       statusText: err.message,
//     });
//   }
// });


/**
 *
 */
router.post("/submit", async (req, res, next) => {
  try {

    if (!req.body) {
      throw new Error('No Payload Provided')
    }

    if (!req.body.uid) {
      throw new Error('No User ID Provided')
    }

    if (!req.body.provider || req.body.provider === 'unknown') {
      throw new Error('No Git Provider')
    }

    if (!req.body.packageURL) {
      throw new Error('No Package Provided')
    }

    const { provider, packageURL, uid } = req.body;


    const doesPackageExist = async () => {
      console.log(packageURL)
      const snapshot = await fs
        .collection('packages')
        .where('repositoryLink', '==', packageURL)
        .get()

      return !snapshot.empty
    }

    let getRepository;
    let getRepositoryResponse;
    let cleanPackageURL;
    let checkRepository;
    let gitResponse;
    let deployArray;
    let owner;
    let repository;
    let gitPackageJSONFile;
    let packageJSONRequest;
    let packageJSON;
    let packageData;
    let data;

    let checkPackage = await doesPackageExist();

    let created_at = new Date();
    let created_at_out = created_at.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    let createdAtTS = created_at.getTime()

    if (!checkPackage) {
      if (provider === 'github') {
        cleanPackageURL = packageURL.replace(/^\/\/|^.*?:(\/\/)?/, '');
        deployArray = cleanPackageURL.split('/');
        owner = deployArray[1];
        repository =
          deployArray[2].indexOf('.') === -1
            ? deployArray[2]
            : deployArray[2].substring(0, deployArray[2].indexOf('.'));

        console.log('getRepository', {
          repository, owner
        })

        checkRepository = await axios.get(
          `https://api.github.com/repos/${owner}/${repository}`
        );

        if (
          checkRepository &&
          Object.prototype.hasOwnProperty.call(checkRepository, 'message') &&
          // @ts-ignore
          checkRepository.message === 'Not Found'
        ) {
          throw new Error(`${packageURL} cannot be found or is a private repository`)
        }

        getRepository = await axios.get(
          `https://api.github.com/repos/${owner}/${repository}/contents/`
        );

        if (getRepository.status !== 200) {
          throw new Error(getRepository.statusText)
        }

        getRepositoryResponse = getRepository.data;
        gitPackageJSONFile = getRepositoryResponse.find((file) => file.name === '.package.manifest.json')

        if (gitPackageJSONFile) {
          packageJSONRequest = await axios.get(
            gitPackageJSONFile.download_url
          );

          packageJSON = packageJSONRequest.data;

          packageData = {
            id: packageJSON.name,
            version: packageJSON.version,
            uid,
            owner,
            repository,
            installLink: gitPackageJSONFile.url,
            repositoryLink: packageURL,
            createdAt: created_at_out,
            createdAtTS
          }

          await fs
            .collection("packages")
            .doc(packageData.id)
            .set(packageData)

          checkPackage = await doesPackageExist();
          if (checkPackage) {
            data = {
              status: 'ok',
              statusText: `${packageData.id} has been saved.`
            }
          } else {
            data = {
              status: 'error',
              statusText: `There was an error saving ${packageData.id}.`
            }
          }
        } else {
          data = {
            status: 'error',
            statusText: `${packageURL} does not have a bldr package file.`
          }
        }
      }
    } else {
      data = {
        status: 'error',
        statusText: `A package already exists for ${packageURL}`
      }
    }

    res.status(200);
    res.json(data);
  } catch (err) {
    err.message;

    let message = err && err.response && err.response.statusText
    let statusText = message === 'Not Found' ? 'Repository cannot be found or may be private.' : err.message

    next({
      status: "error",
      statusCode: 400,
      statusText,
    });
  }
});

module.exports = router;
