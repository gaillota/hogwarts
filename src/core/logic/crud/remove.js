const deleteDocument = async ({
                                         request: {
                                             documentId,
                                         },
                                         data: {
                                             deleteDocumentWithId,
                                         },
                                         response: {
                                             respondWithResult,
                                             respondWithError,
                                         },
                                     }) => {
    try {
        const result = await deleteDocumentWithId(documentId)
        respondWithResult(result)
    } catch (err) {
        respondWithError(err)
    }
}

module.exports = deleteDocument
