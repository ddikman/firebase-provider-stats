const CliTest = require('command-line-test');
const chai = require('chai')
var expect = chai.expect;

describe('index.js', function() {
  it('can parse file', async () => {
    const tester = new CliTest()
    const result = await tester.exec('node index.js ./example.json');
    const output = result.stdout;
    const rows = output.split('\n')
    try {
      expect(rows).contains('anonymous: 1 total, 0 last month')
      expect(rows).contains('google.com: 2 total, 0 last month')
      expect(rows).contains('facebook.com: 1 total, 0 last month')
      expect(rows).contains('email: 1 total, 0 last month')
      expect(rows).contains('phone: 1 total, 0 last month')
      expect(rows).contains('apple: 1 total, 0 last month')
    } catch (err) {
      console.log('Test failed. Full output was:')
      console.log(output)
      throw err
    }
  })
})