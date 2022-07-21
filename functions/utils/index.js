const { v4: uuidv4 } = require("uuid");
const { fs } = require("../utils/database/firebase");

module.exports = {};

module.exports.guid = () => uuidv4();

/**
 *
 * @param {string} uid
 */
module.exports.readProfileData = async (uid) => {
  const collection = await fs.collection("users").doc(uid).get();
  return collection.data();
};

/**
 *
 * @param {string} uid
 * @param {number} start
 * @param {number} end
 * @param {number} pageSize
 * @param {string} filterTS
 * @return {promise}
 */
module.exports.readCollection = async (uid, start, end, pageSize, filterTS) => {
  try {
    const data = [];
    const metaDoc = fs.collection("metadata").doc("packages");
    const pkgDoc = await metaDoc.get();
    const pkgMetadata = await pkgDoc.data();

    let collection = fs.collection("packages");

    collection = collection.orderBy("createdAtTS");

    if (start !== 0) {
      // @ts-ignore
      collection = collection.startAfter(start);
    }

    if (end !== 0) {
      // @ts-ignore
      collection = collection.endAt(end);
    }

    const getQuery = await collection.get();
    getQuery.forEach((doc) => {
      const docData = doc.data();
      // console.log('doc', docData)

      data.push(docData);
    });

    console.log(data);
    const pages = {};
    const count = pkgMetadata.count;

    if (count > pageSize) {
      const nextStart = data[data.length - 1]["createdAtTS"] || "";
      const nextEnd = data[0]["createdAtTS"] || "";
      let next = `/?start=${nextStart}&end=${nextEnd}`;
      let previous = `/?start=${nextStart}&end=${nextEnd}`;

      if (uid) {
        next += `&uid=${uid}`;
        previous += `&uid=${uid}`;
      }

      if (filterTS) {
        next += `&since=${filterTS}`;
        previous += `&since=${filterTS}`;
      }

      pages.next = next;

      if (start !== 0) {
        pages.previous = previous;
      }
    }

    return {
      status: "ok",
      count,
      pages,
      data,
    };
  } catch (err) {
    console.log(err);
  }
};

module.exports.incrementMetaDataCount = async (doc) => {
  const metaDoc = fs.collection("metadata").doc(doc);
  const pkgDoc = await metaDoc.get();
  const pkgData = await pkgDoc.data();

  pkgData.count++;

  await metaDoc.set(pkgData);
};

module.exports.decrementMetaDataCount = async (doc) => {
  const metaDoc = fs.collection("metadata").doc(doc);
  const pkgDoc = await metaDoc.get();
  const pkgData = await pkgDoc.data();

  pkgData.count--;
  await metaDoc.set(pkgData);
};

module.exports.getMetaDataDocument = async (doc) => {
  const metaDoc = fs.collection("metadata").doc(doc);
  const pkgDoc = await metaDoc.get();
  const pkgData = await pkgDoc.data();
  return pkgData;
};

/**
 * @param {array} arr
 * @param {number} size
 * @return {array}
 */
module.exports.chunk = (arr, size) => {
  return [...Array(Math.ceil(arr.length / size))].map((_, i) =>
    arr.slice(size * i, size + size * i),
  );
};
