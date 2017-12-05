/* eslint-disable global-require */
module.exports = {
    insertDocument: require('./create'),
    fetchDocumentById: require('./find-one'),
    fetchDocuments: require('./find-by'),
    updateDocument: require('./update'),
    deleteDocument: require('./remove'),
}
