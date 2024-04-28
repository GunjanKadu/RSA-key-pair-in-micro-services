### Overview

We will learn how to use #RSA #private-public key-pair to be used as a secret inside your JWT. Instead of using symmetric key to sign and verify the jwt's, we will be using asymmetric algorithm to sign and verify the jwt. Private key would be used to sign a JWT and the public key would be used to verify the signature of the JWT. The tutorial is based upon the #RFC7517 standard using Json Web Keys. You would be learning how to provide the public key to other micro services using something called a (#JWKS) Json Web Key Sets (#jwks.json).

It's something that is also used by #Auth0, the identity management provider, they use the same logic for client side verification of the #Access tokens.

![Overview](https://github.com/GunjanKadu/RSA-key-pair-in-micro-services/blob/master/Overview.png)
