import dotenv from 'dotenv'

export async function setup() {
    console.log('Setting up connection')
    dotenv.config()
}

export async function teardown() {
    console.log('Teardown connection')
    delete global['client']
    delete global['db']
}
