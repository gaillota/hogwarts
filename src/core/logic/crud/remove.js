const deleteDocument = async ({
                                         request: {
                                             documentId,
                                         },
                                         data: {
                                             deleteDocumentWithId,
                                         },
                                         response: {
                                             respondWithSuccess,
                                             respondWithError,
                                         },
                                     }) => {
    try {
        await deleteDocumentWithId(documentId)
        respondWithSuccess()
    } catch (err) {
        respondWithError(err)
    }
}

module.exports = deleteDocument
