const updateDocument = async ({
                                  request: {
                                      documentId,
                                      newDocument,
                                  },
                                  data: {
                                      updateDocumentWithId,
                                  },
                                  response: {
                                      respondWithResult,
                                      respondWithError,
                                  },
                              }) => {
    try {
        const result = await updateDocumentWithId(documentId, newDocument)
        respondWithResult(result)
    } catch (err) {
        respondWithError(err)
    }
}

module.exports = updateDocument
