const insertDocument = async ({
                                  request: {
                                      document,
                                  },
                                  data: {
                                      persistDocument,
                                  },
                                  response: {
                                      respondWithSuccess,
                                      respondWithError,
                                  },
                              }) => {
    try {
        await persistDocument(document)
        respondWithSuccess()
    } catch (err) {
        respondWithError(err)
    }
}

module.exports = insertDocument
