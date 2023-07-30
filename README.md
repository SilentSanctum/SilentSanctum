# SilentSanctum <img src="https://github.com/SilentSanctum/SilentSanctum/assets/32927982/968823b8-53e0-4091-96e9-5e0030e1392a" alt="alt text" align="right" width="200"/>
#### _Embrace Anonymity: Discover, Express, Engage_

Silent Sanctum is an innovative anonymous social media application that empowers users to freely express themselves without fear of judgment or exposure. It provides a safe and respectful environment for authentic interactions, where users can engage based solely on the quality of content they share.

### Features
- Anonymous IDs: Users receive a unique anonymous ID upon sign-in, which remains active for 24 hours, promoting genuine connections without revealing personal identities.
- Time-Limited Posts: Posts created by users are visible on the platform for one day, ensuring a constantly evolving and dynamic community.
- Content-Centric Engagement: User interactions are solely driven by the quality of content shared, encouraging meaningful discussions and creative expression.
- Secure Authentication: We use Auth0 for robust and secure user authentication, safeguarding privacy and ensuring a safe user experience.
- Auto-Deletion of Posts: We leverage MongoDB's TTL index to automatically delete posts after their 24-hour lifespan, keeping the platform fresh and clutter-free.

### Getting Started
To get started with Silent Sanctum, follow these steps:

#### Clone the repository:
```bash
git clone https://github.com/your-organization/silent-sanctum.git
cd silent-sanctum
```

#### Install the dependencies:
Install the dependencies in Frontend and Backend folders respectively.

```npm install```

#### Set up environment variables:
Create a .env file in Backend directory and add the following variables:
```
DB_USERNAME=<your mongodb username>
DB_PASSWORD=<your mongodb password>
```

#### Run Angular app

_Make sure you have latest Angular core and CLI installed_

In Frontend/SilentSanctum folder, open terminal and type:

```bash
ng serve -o
```

#### Run Node.js server
_Make sure you serve in port 3000._

In Backend folder, open terminal and type:

```bash
node server.js
```

You are good to go now!

### Contributing
We welcome contributions to improve Silent Sanctum and make it even better. To contribute, follow these steps:

- Fork the repository.
- Create your feature branch: git checkout -b feature/YourFeature
- Commit your changes: git commit -m 'Add some feature'
- Push to the branch: git push origin feature/YourFeature
- Open a pull request.
- Please ensure your code adheres to the project's coding standards and includes appropriate test coverage.

### License
Silent Sanctum is open-source software licensed under the MIT License.

### Acknowledgements
We would like to express our gratitude to all contributors and **Major League Hacking** community for their support, making this project possible and promoting a respectful and inclusive online community.





