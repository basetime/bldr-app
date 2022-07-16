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


    collection = collection.orderBy("createdAtTS", "desc").limit(pageSize)

    const getQuery = await collection.get();

    console.log('getQuery', getQuery)
    getQuery.forEach((doc) => {
      let docData = doc.data();
      console.log('doc', docData)

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