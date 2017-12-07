const updateDocument = async ({
                                  request: {
                                      documentId,
                                      updatedFields,
                                  },
                                  data: {
                                      updateDocumentWithId,
                                  },
                                  response: {
                                      respondWithIdRequired,
                                      respondWithEmptyDocument,
                                      respondWithResult,
                                      respondWithError,
                                  },
                              }) => {
    try {
        if (!documentId) {
            return respondWithIdRequired()
        }
        if (!updatedFields || !Object.keys(updatedFields).length) {
            return respondWithEmptyDocument()
        }
        
        const result = await updateDocumentWithId(documentId, updatedFields)
        respondWithResult(result)
    } catch (err) {
        respondWithError(err)
    }
}

module.exports = updateDocument
