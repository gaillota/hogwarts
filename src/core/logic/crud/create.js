const insertDocument = async ({
                                  request: {
                                      document,
                                  },
                                  data: {
                                      persistDocument,
                                  },
                                  response: {
                                      respondWithNoDocument,
                                      respondWithResult,
                                      respondWithError,
                                  },
                              }) => {
    try {
        if (!document) {
            return respondWithNoDocument()
        }
        const result = await persistDocument(document)
        respondWithResult(result)
    } catch (err) {
        respondWithError(err)
    }
}

module.exports = insertDocument
