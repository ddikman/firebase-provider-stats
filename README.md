# firebase-provider-stats

Tiny nodejs based tool to calculate some quick stats based on Firebase Auth.

![Example usage](./example.png)

## Why this project?

Because I needed to figure out if my Facebook provider was still worth having in my project or if I could safely just wipe it by looking at the number of users that was registered with Facebook.

Firebase auth is amazing at removing the pain of authentication handling and securing logins. However, when it comes to providing data about who is registered, you need to add some effort yourself.

## Usage

First, you need to download your auth data. This is most easily done using the [firebase cli](https://firebase.google.com/docs/cli):

```bash
firebase --project <optional> auth:export users.json
```

Then you run this little tool to get the data out:

```bash
npm install -g firebase-provider-stats
firebase-provider-stats users.json
```

## Details about the stats

This tool is at the mercy of what data the firebase user export provides. This means, email and phone registrations cannot be easily detected as these simply get added as data to the user object rather than as providers.

In order to count the email and phone logins, the existance of these fields are compared. Email is registered for any provider that is added with email as well, so I consider it a user with email login only if no providers are given.

⚠️ It also appears that the data for apple as a provider is not added to the provider list when exporting either so unfortunately, stats for apple logins is not supported.

## Build

To install dependencies and run locally:

```
npm install
npm link
firebase-provider-stats <your-file>
```

And to test:
```
npm test
```

This will use the provided example testfile `example.json`.

## Publishing

Publishing to NPM is done automatically by any tag.

1. Update version in [package.json](package.json)
2. Tag it with `git tag vx.x.x` and `git push origin vx.x.x`
3. Sit back and let it build

## Credits

Big shoutout to [LogRockets article on creating CLI tools](https://blog.logrocket.com/creating-a-cli-tool-with-node-js/)

## License
The MIT License (MIT)
