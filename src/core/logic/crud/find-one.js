const retrieveDocumentWithId = async ({
                                          request: {
                                              documentId,
                                          },
                                          data: {
                                              getDocumentById,
                                          },
                                          response: {
                                              respondWithDocumentNotFound,
                                              respondWithCorrectDocument,
                                              respondWithError,
                                          },
                                      }) => {
    try {
        const document = await getDocumentById(documentId)
        if (!document) {
            return respondWithDocumentNotFound()
        }
        respondWithCorrectDocument(document)
    } catch (err) {
        respondWithError(err)
    }
}

module.exports = retrieveDocumentWithId
