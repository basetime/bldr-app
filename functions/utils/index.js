const { v4: uuidv4 } = require('uuid');
const { fs } = require('../utils/database/firebase')

module.exports = {};


module.exports.guid = () => uuidv4();

/**
 * 
 * @param {string} uid 
 */
module.exports.readProfileData = async (uid) => {
  let collection = await fs
    .collection("users")
    .doc(uid)
    .get()

    return collection.data()
}

/**
  *
  * @param {string} uid
  * @param {number} start
  * @param {number} end
  * @param {number} pageSize
  * @param {string} filterTS
  * @returns {promise}
  */
module.exports.readCollection = async (
  uid,
  start,
  end,
  pageSize,
  filterTS
) => {
  try {
    let data = new Array();

    let collection = fs
      .collection("packages")

    if (uid) {
      collection = collection.where('uid', '==', uid)
    }

    if (filterTS) {
      // @ts-ignore
      collection = collection.where("createdAtTS", ">=", filterTS);
    }

    // if (uid || filterTS) {
    //   // @ts-ignore
    //   collection = collection.orderBy("createdAtTS", "desc");
    // }

    if (start !== 0) {
      // @ts-ignore
      collection = collection.startAfter(start);
    }

    if (end !== 0) {
      // @ts-ignore
      collection = collection.endAt(end);
    }

    // if(!uid && !filterTS && !start && !end){
    //   collection = collection.where('uid')
    // }
    collection = collection.orderBy("createdAtTS", "desc")

    const getQuery = await collection.get();
    getQuery.forEach((doc) => {
      let docData = doc.data();
      // console.log('doc', docData)

      data.push(docData);
    });

    let pages = {};
    let count = getQuery.size;

    if (count === pageSize) {
      let nextStart = data[data.length - 1]["createdAtTS"] || "";
      let nextEnd = data[0]["createdAtTS"] || "";
      let next = `/?start=${nextStart}&end=${nextEnd}`;
      let previous = `/?start=${nextStart}&end=${nextEnd}`;

      if (uid) {
        next += `&uid=${uid}`
        previous += `&uid=${uid}`
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
}


module.exports.incrementMetaDataCount = async (doc) => {
  let metaDoc = fs.collection('metadata').doc(doc)
  pkgDoc = await metaDoc.get()
  pkgData = await pkgDoc.data();

  pkgData.count++

  await metaDoc.set(pkgData)
}


module.exports.decrementMetaDataCount = async (doc) => {
  let metaDoc = fs.collection('metadata').doc(doc)
  pkgDoc = await metaDoc.get()
  pkgData = await pkgDoc.data();

  pkgData.count--
  await metaDoc.set(pkgData)
}


module.exports.getMetaDataDocument = async (doc) => {
  let metaDoc = fs.collection('metadata').doc(doc)
  pkgDoc = await metaDoc.get()
  pkgData = await pkgDoc.data();
  return pkgData
}
/**
 *
 * @param {array} arr
 * @param {number} size
 * @returns
 */
 module.exports.chunk = (arr, size) => {
  return [...Array(Math.ceil(arr.length / size))].map((_, i) =>
    arr.slice(size * i, size + size * i)
  );
};