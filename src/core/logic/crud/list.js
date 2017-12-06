const fetchDocuments = async ({
                                  request: {
                                      query,
                                      offset = 0,
                                      count = 15,
                                      page = 1,
                                  },
                                  data: {
                                      fetchDocumentsBy,
                                      getDocumentsCount,
                                  },
                                  response: {
                                      respondWithNoDocuments,
                                      respondWithFoundDocuments,
                                      respondWithError,
                                  },
                              }) => {
    try {
        // eslint-disable-next-line no-param-reassign
        offset = offset || count * (page - 1)
        const [documents, total] = await Promise.all([
            fetchDocumentsBy({ query, limit: count, offset }),
            getDocumentsCount(),
        ])
        
        if (!documents || !documents.length) {
            return respondWithNoDocuments({ count, offset, total })
        }
        
        respondWithFoundDocuments({ documents, count, offset, total })
    } catch (err) {
        respondWithError(err)
    }
}

module.exports = fetchDocuments
