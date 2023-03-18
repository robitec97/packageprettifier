import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as xml2js from 'xml2js';
import { PackageXml, PackageType } from './types';

const parser = new xml2js.Parser();
const builder = new xml2js.Builder();

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('packageprettifier.updatePackageXml', function () {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showErrorMessage('No active editor found.');
      return;
    }

    const document = editor.document;
    /*if (document.languageId !== 'xml' && !document.fileName.endsWith('package.xml')) {
        vscode.window.showErrorMessage('Not a package.xml file.');
        return;
    }*/

    const packageXmlContent = document.getText();
    parser.parseString(packageXmlContent, (err, result: PackageXml) => {
      if (err) {
        vscode.window.showErrorMessage('Error parsing package.xml: ' + err);
        return;
      }

      const processedXml = processPackageXml(result);
      const newXmlContent = builder.buildObject(processedXml);

      fs.writeFile(document.uri.fsPath, newXmlContent, (err) => {
        if (err) {
          vscode.window.showErrorMessage('Error writing updated package.xml: ' + err);
          return;
        }

        vscode.window.showInformationMessage('package.xml processed successfully.');
      });
    });
  });

  context.subscriptions.push(disposable);
}

function processPackageXml(xmlObj: PackageXml): PackageXml {
  const typesMap: Record<string, PackageType> = {};

  if (!xmlObj.Package.types) {
    return xmlObj;
  }

  xmlObj.Package.types.forEach((type) => {
    const name = type.name[0];
    if (typesMap[name]) {
      typesMap[name].members = typesMap[name].members.concat(type.members);
    } else {
      typesMap[name] = {
        name: [name],
        members: type.members,
      };
    }
  });

  const sortedTypes = Object.entries(typesMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, data]) => {
      const uniqueMembers = Array.from(new Set(data.members));
      uniqueMembers.sort((a, b) => a.localeCompare(b));
      const nameIndex = uniqueMembers.indexOf(name);
      if (nameIndex > -1) {
        uniqueMembers.splice(nameIndex, 1);
      }
      // Remove the following line
      // uniqueMembers.push(name);
      
      // Create a new array with the name as the last element
      const orderedMembers = [...uniqueMembers, name];

      return {
        members: orderedMembers,
        name: [name]
      };
    });

  xmlObj.Package.types = sortedTypes;
  return xmlObj;
}


export function deactivate() {}
