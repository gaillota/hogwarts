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
                                      respondWithData,
                                      respondWithError,
                                  },
                              }) => {
    try {
        // eslint-disable-next-line no-param-reassign
        const skip = offset || count * (page - 1)
        const [documents, total] = await Promise.all([
            fetchDocumentsBy({ query, limit: count, offset: skip }),
            getDocumentsCount(),
        ])
        
        if (!documents || !documents.length) {
            return respondWithData({
                documents: [],
                count: 0,
                offset,
                total,
            })
        }
        
        respondWithData({
            documents,
            count: documents.length,
            offset: skip,
            total,
        })
    } catch (err) {
        respondWithError(err)
    }
}

module.exports = fetchDocuments
