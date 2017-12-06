/* eslint-disable global-require */
module.exports = {
    insertDocument: require('./create'),
    fetchDocumentById: require('./get'),
    fetchDocuments: require('./list'),
    updateDocument: require('./update'),
    deleteDocument: require('./remove'),
}
