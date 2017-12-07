const insertDocument = async ({
                                  request: {
                                      document,
                                  },
                                  data: {
                                      persistDocument,
                                  },
                                  response: {
                                      respondWithNoDocument,
                                      respondWithSuccess,
                                      respondWithError,
                                  },
                              }) => {
    try {
        if (!document || !Object.keys(document).length) {
            return respondWithNoDocument()
        }
        await persistDocument(document)
        respondWithSuccess()
    } catch (err) {
        respondWithError(err)
    }
}

module.exports = insertDocument
