export default async function () {
    console.log('Teardown connection')
    delete global['client']
    delete global['db']
}
