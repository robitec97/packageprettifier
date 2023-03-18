Package Prettifier
This extension provides a command to prettify the package.xml file in your Salesforce metadata project. The command removes any duplicate <members> elements within each <types> element, sorts the <members> elements alphabetically, and moves the <name> element to be the last child of its corresponding <types> element. This makes the package.xml file easier to read and maintain.

Usage
To use the extension, right-click on a package.xml file in the VSCode Explorer and select "Update Package XML" from the context menu. The updated XML is then written to the original file.

Requirements
This extension requires the following dependencies:

xml2js: A JavaScript library for converting between XML and JavaScript objects.
Installation
To install the extension, follow these steps:

Download the VSIX package file for the extension.
Open VSCode and go to the Extensions view (Ctrl+Shift+X or Cmd+Shift+X).
Click the "..." button and select "Install from VSIX".
Navigate to the downloaded VSIX file and select it.
Click "Install" to install the extension.
Contributing
If you encounter any issues or have suggestions for improvements, please open an issue on the GitHub repository. Pull requests are also welcome!

License
This extension is licensed under the MIT License. See the LICENSE file for details.