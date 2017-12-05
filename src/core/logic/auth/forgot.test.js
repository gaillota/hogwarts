const forgotPassword = require('./forgot')

describe('Forgot password logic', () => {
    let mockFunc

    const defaultParams = {
        request: {
            login: 'me',
        },
        data: {
            findUserWithLogin(login) {
                return login === 'me' && {
                    username: 'me',
                    email: 'me@example.com',
                    password: 'secret',
                }
            },
            persistTokenForUser() {
                return true
            },
        },
        mixins: {
            generateToken() {
                return 'token'
            },
        },
        notifications: {
            sendToken() {
                return true
            },
        },
        response: {
            respondWithMissingParameter() {
            },
            respondWithUserNotFound() {
            },
            respondWithTokenError() {
            },
            respondWithSuccess() {
            },
        },
    }

    const expectMockFuncToBeCalled = times => expect(mockFunc.mock.calls.length).toBe(times)

    beforeEach(() => {
        mockFunc = jest.fn()
    })

    test('when login is not provided', async () => {
        const params = {
            ...defaultParams,
            request: {
                login: '',
            },
            // Override data functions to ensure test failure in case function continues to run
            data: {},
            response: {
                respondWithMissingParameter: mockFunc,
            },
        }

        await forgotPassword(params)

        expectMockFuncToBeCalled(1)
    })

    test('when user does not exist', async () => {
        const params = {
            ...defaultParams,
            request: {
                login: 'unknown',
            },
            response: {
                respondWithUserNotFound: mockFunc,
            },
        }

        await forgotPassword(params)

        expectMockFuncToBeCalled(1)
    })

    test('when token is not correctly generated', async () => {
        const params = {
            ...defaultParams,
            mixins: {
                generateToken() {
                    return null
                },
            },
            data: {
                ...defaultParams.data,
                persistTokenForUser: mockFunc,
            },
        }

        await forgotPassword(params)

        expectMockFuncToBeCalled(0)
    })

    test('when user exists', async () => {
        const params = {
            ...defaultParams,
            data: {
                ...defaultParams.data,
                persistTokenForUser: mockFunc,
            },
            mixins: {
                generateToken: mockFunc,
            },
            notifications: {
                sendToken: mockFunc,
            },
            response: {
                respondWithSuccess: mockFunc,
            },
        }

        mockFunc
            .mockReturnValueOnce(true)
            .mockReturnValueOnce('token')
            .mockReturnValue(true)

        await forgotPassword(params)

        expectMockFuncToBeCalled(4)
    })
})
