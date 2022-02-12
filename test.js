const CliTest = require('command-line-test');
const chai = require('chai')
var expect = chai.expect;

describe('index.js', function() {
  it('can parse file', async () => {
    const tester = new CliTest()
    const result = await tester.exec('node index.js ./example.json');
    const output = result.stdout;
    expect(output).contains('anonymous: 1 total, 0 last month')
    expect(output).contains('google.com: 2 total, 1 last month')
    expect(output).contains('facebook.com: 1 total, 0 last month')
  })
})