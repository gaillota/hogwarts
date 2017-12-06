const fetchDocumentById = async ({
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
        console.log('An error happened')
        respondWithError(err)
    }
}

module.exports = fetchDocumentById
