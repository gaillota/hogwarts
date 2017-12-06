/* eslint-disable global-require */
module.exports = {
    insertDocument: require('./create'),
    fetchDocumentById: require('./one'),
    fetchDocuments: require('./list'),
    updateDocument: require('./update'),
    deleteDocument: require('./remove'),
}
