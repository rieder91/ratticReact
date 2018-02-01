/**
 * Created by trieder on 30.09.2015.
 */
let devMode = false;
// MOCK_API gets replaced by the webpack-dev-server
if (MOCK_API) {
    console.log("Enabling development mode; using fixtures");
    devMode = true;
}

const ratticURL = "https://your-rattic-instance.pw";

export {
    devMode,
    ratticURL
};