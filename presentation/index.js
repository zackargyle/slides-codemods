/*
  - Internal Data Structures
  - Reconciliation
  - Events
  - Fiber
*/

import React from "react";
import {
  Appear,
  BlockQuote,
  Cite,
  Link,
  List,
  ListItem,
  Quote,
  CodePane,
  Deck,
  Heading,
  Image,
  Slide,
  Spectacle,
  Text
} from "spectacle";
import CodeSlide from 'spectacle-code-slide';
import images from "./images";
import theme from "./theme";

require("normalize.css");
require("spectacle/lib/themes/default/index.css");

const CodeStyle = { minWidth: "60%", maxWidth: "60%", fontSize: "1rem", display: "inline-block", verticalAlign: "top" };

/*
https://github.com/DrewML/jscodeshift-intro-presentation/blob/master/presentation/index.js
https://github.com/FormidableLabs/spectacle
https://github.com/facebook/jscodeshift

[3] Intro
[5] Codemod Overview
[5] AST Primer
[5] JSCodeshift
[10] Examples
[5] JSX
[10] Q&A

Overview
  - Example. Webpack 1 -> Webpack 2: https://github.com/webpack/webpack-cli/pull/40. ExtractTextPlugin
  - Sample code: store.dispatch => erots.hctapsid
    - https://github.com/facebook/jscodeshift/blob/master/sample/reverse-identifiers.js
JSCodeshift
  - Node, Path, Collection, Recast

JSX



arrow-functions

// Replace bound functions
const thisBoundEpression = (
  <CallExpression arguments={[<ThisExpression />]}>
    <MemberExpression>
      <FunctionExpression />
      <Identifier value="bind" />
    </MemberExpression>
  </CallExpression>
);

const arrowFunc = (node) => (
  <ArrowFunctionExpression>
    {node.callee.object.body}
  </ArrowFunctionExpression>
);

j.find(thisBoundEpression).replaceWith(arrowFunc);
*/

export default class Presentation extends React.Component {
  render() {
    return (
      <Spectacle theme={theme}>
        <Deck theme={theme} transition={["fade"]} transitionDuration={200}>

          <Slide>
            <Heading size={1} fit caps lineHeight={1} textColor="black">
              Large-scale
            </Heading>
            <Heading size={1} caps lineHeight={1.2}>
              Codemods
            </Heading>
            <Text caps lineHeight={3} textColor="black">
              <b>Zack Argyle</b>
            </Text>
          </Slide>

          {/* INTRODUCTION */}

          <Slide>
            <Heading size={1} lineHeight={1} textColor="black">Hello 😆</Heading>
            <Text textColor="quartenary" style={{ display: 'inline' }}>I'm</Text>
            <Text textColor="tertiary" style={{ display: 'inline' }}> Zack.</Text>
            <Text textColor="quartenary" style={{ display: 'inline' }}>This is my family.</Text>
            <div>
              <Image src={images.halloween.replace("/", "")} margin="5% 0" width="40%"/>
            </div>
          </Slide>

          <Slide>
            <Heading size={1} caps lineHeight={1} textColor="black">
              Bio
            </Heading>
            <Text lineHeight={1} textColor="quartenary">
              Engineer. Husband. Father. Dungeon Master. Seattle raised. SF Based.
            </Text>
            <Image src={images.bio.replace("/", "")} margin="5% 0" width="60%"/>
            <Image src={images.suit.replace("/", "")} margin="6%" width="25%"/>
          </Slide>

          <Slide>
            <Heading size={1} caps lineHeight={1} textColor="black">
              Outline
            </Heading>
            <List ordered style={{ color: 'black' }}>
              <Appear><ListItem>Overview</ListItem></Appear>
              <Appear><ListItem>AST Primer</ListItem></Appear>
              <Appear><ListItem>JSCodeshift</ListItem></Appear>
              <Appear><ListItem>Try it out!</ListItem></Appear>
              <Appear><ListItem>😱 Mystery 😱</ListItem></Appear>
              <Appear><ListItem>Q&A</ListItem></Appear>
            </List>
          </Slide>

          {/* OVERVIEW */}

          <Slide>
            <Heading size={1} caps lineHeight={1}>
              Overview
            </Heading>
          </Slide>

          <Slide>
            <Heading size={1} fit lineHeight={1}>
                What is a codemod?
            </Heading>
            <Appear>
              <Text>Automated codebase refactoring</Text>
            </Appear>
            <Appear>
              <Text>by mutating the Abstract Syntax Tree (AST)</Text>
            </Appear>
          </Slide>

          <Slide>
            <Image src={images.gif.wtf.replace("/", "")} width="90%"/>
          </Slide>

          <Slide>
            <Heading size={1} fit lineHeight={1}>
              Why not just regex replace?
            </Heading>
            <List style={{ color: 'black' }}>
              <ListItem>More complicated use cases <span style={{ fontSize: '1.5vw' }}>(I still use regex all the time)</span></ListItem>
              <ListItem>Great for open-source maintainers</ListItem>
            </List>
            <Appear>
              <Text>Example: convert all .bind(this) calls to arrows</Text>
            </Appear>
          </Slide>

          <Slide>
            <Heading size={1} caps fit>
                Codemods at Pinterest
            </Heading>
            <List style={{ color: 'black' }}>
              <Appear><ListItem>Internal Library changes</ListItem></Appear>
              <Appear><ListItem>Introducing new ESLint rules</ListItem></Appear>
              <Appear><ListItem>Package updates (React, webpack, etc)</ListItem></Appear>
              <Appear><ListItem>Package removal</ListItem></Appear>
            </List>
          </Slide>

          {/* AST PRIMER */}

          <Slide>
            <Heading size={1} caps lineHeight={1}>
              AST Primer
            </Heading>
          </Slide>

          <Slide>
            <Heading fit caps lineHeight={1}>
              It's just a tree
            </Heading>
            <Text>that describes code with fancy words</Text>
            <Image src={images.ast.vizualization.replace("/", "")} width="75%"/>
          </Slide>

          <Slide>
            <Image src={images.ast.preparsed.replace("/", "")} width="75%"/>
          </Slide>

          <Slide>
            <Image src={images.ast.tokenized.replace("/", "")} width="75%"/>
          </Slide>

          <Slide>
            <Image src={images.ast.parsed.replace("/", "")} width="75%"/>
          </Slide>

          <Slide>
            <Heading>Node Types</Heading>
          </Slide>

          <Slide>
            <Heading>Identifier</Heading>
            <CodePane
              lang="js"
              style={{ fontSize: '2.5vw' }}
              source={`var Identifier = {
                    type: 'Identifier',
                    name: 'answerToLife',
                };`.replace(/                /g, '')
              }
            />
          </Slide>

          <Slide>
            <Heading>Literal</Heading>
            <CodePane
              lang="js"
              style={{ fontSize: '2.5vw' }}
              source={`var Literal = {
                    type: 'Literal',
                    value: 42,
                    raw: "42",
                };`.replace(/                /g, '')
              }
            />
          </Slide>

          <Slide>
            <Heading style={{ paddingBottom: '2px' }} fit>MemberExpression</Heading>
            <CodePane
              lang="js"
              style={{ fontSize: '2.5vw' }}
              source={`// _.map
                var MemberExpression = {
                    type: 'MemberExpression',
                    object: Identifier, // "_"
                    property: Identifier|Literal, // "map"
                };`.replace(/                /g, '')
              }
            />
          </Slide>

          <Slide>
            <Heading fit>BinaryExpression</Heading>
          </Slide>

          <Slide>
            <Heading fit>VariableDeclarator</Heading>
          </Slide>

          <Slide>
            <Heading fit>VariableDeclaration</Heading>
          </Slide>

          <Slide>
            <Heading fit>FunctionDeclaration</Heading>
          </Slide>

          <Slide>
            <Heading fit>ForStatement</Heading>
          </Slide>

          <Slide>
            <Heading fit>WhileStatement</Heading>
          </Slide>

          <Slide>
            <Image src={images.gif.tooMuch.replace("/", "")} width="75%"/>
          </Slide>

          <Slide>
            <Heading style={{ paddingBottom: '2px' }}>AST Explorer</Heading>
            <Image src={images.ast.explorer.replace("/", "")} width="100%"/>
            <Link href="https://astexplorer.net/">https://astexplorer.net/</Link>
          </Slide>

          {/* JSCodeshift */}

          <Slide>
            <Heading size={1} caps lineHeight={1}>
              JSCodeshift
            </Heading>
          </Slide>

          <Slide>
            <Heading size={1} fit lineHeight={1}>What is JSCodeShift?</Heading>
            <Text>An open-source library that provides a simple API for finding and mutating AST nodes.</Text>
            <Text>In other words, a tool for writing codemods.</Text>
          </Slide>

          <Slide>
            <BlockQuote>
              <Quote style={{ color: "black" }}>"JSCodeshift is the jQuery of JS trees."</Quote>
              <Cite>A Human</Cite>
            </BlockQuote>
          </Slide>

          <Slide>
            <Heading size={1} fit lineHeight={1}>What is Recast?</Heading>
            <Text>An open-source library that provides a simple API for finding and mutating AST nodes.</Text>
            <Text>In other words, a tool for writing codemods.</Text>
          </Slide>

          {/* Try it out */}

          <Slide>
            <Heading size={1} caps lineHeight={1}>
              Let's try it out!
            </Heading>
          </Slide>

          <CodeSlide
            lang="js"
            transition={[]}
            code={require("raw-loader!../assets/snippets/base-codemod")}
            ranges={[
                { loc: [0, 9], title: "Codemod basics" },
                { loc: [0, 1], title: "Arguments" },
                { loc: [1, 2], title: "`j`" },
                { loc: [3, 4], title: "Parse" },
                { loc: [5, 6], title: "Modify" },
                { loc: [7, 8], title: "Return changes" }
            ]}
          />

          <CodeSlide
            lang="js"
            transition={[]}
            code={require("raw-loader!../assets/snippets/foobar-codemod")}
            ranges={[
                { loc: [0, 0], title: "Change foo to bar" },
                { loc: [3, 4], title: "Parse" },
                { loc: [4, 5], title: "Find `foo` Identifiers" },
                { loc: [5, 6], title: "Replace with `boo` Identifier" },
                { loc: [6, 7], title: "Return changes" },
                { loc: [0, 9], title: "Review" }
            ]}
          />

          {/* https://github.com/benjamn/ast-types/blob/master/def/core.js */}

          <Slide>
            <Heading style={{ paddingBottom: '2px' }}>AST Types</Heading>
            <Image src={images.ast.types.replace("/", "")} width="100%"/>
            <Link href="https://github.com/benjamn/ast-types/blob/master/def/core.js">https://github.com/benjamn/ast-types/blob/master/def/core.js/</Link>
          </Slide>

          <Slide>
            <Heading size={1} caps lineHeight={1}>
              Let's write our own
            </Heading>
          </Slide>

          <Slide>
            <Image src={images.gif.impossible.replace("/", "")} width="100%"/>
          </Slide>













          {/* Mystery -- JSX */}

          <Slide>
            <Heading size={1} caps lineHeight={1}>
              😱 Mystery 😱
            </Heading>
          </Slide>

          <CodeSlide
              lang="js"
            transition={[]}
            code={require("raw-loader!../assets/snippets/foobar-codemod-jsx")}
            ranges={[
                { loc: [0, 9], title: "Use JSX" }
            ]}
          />

          <Slide>
            <Image src={images.gif.notReady.replace("/", "")} width="100%"/>
          </Slide>

          {/* https://github.com/facebook/jscodeshift/pull/162 */}

          {/* Q&A */}

          <Slide>
            <Heading size={1} caps lineHeight={1}>
              Q&A
            </Heading>
          </Slide>

          <Slide>
            <Heading size={1} fit lineHeight={1}>
                Keep in touch!
            </Heading>
            <Text>zackargyle</Text>
            <Link href="https://twitter.com/zackargyle">
              <Image src={images.icon.twitter.replace("/", "")} width="10%" style={{ padding: 10 }} />
            </Link>
            <Link href="https://medium.com/@zackargyle/">
              <Image src={images.icon.medium.replace("/", "")} width="10%" style={{ padding: 10 }} />
            </Link>
            <Link href="https://github.com/zackargyle/">
              <Image src={images.icon.github.replace("/", "")} width="10%" style={{ padding: 10 }} />
            </Link>
          </Slide>

  {/*
      <Link target="_blank" href="http://isfiberreadyyet.com">Is Fiber Ready Yet?</Link>
      <CodePane
        lang="js"
        style={{ ...CodeStyle, fontSize: ".9rem", minWidth: "50%", maxWidth: "50%" }}
        source={require("raw-loader!../assets/snippets/jsx")}
      />
      <Quote style={{ color: "#000", fontSize: "24px", fontWeight: "normal", textAlign: "left" }}>
        "Fiber reimplements the reconciler. It is not principally concerned with rendering, though renderers will need to change to support (and take advantage of) the new architecture." - acdlite
      </Quote>

  */}

        </Deck>
      </Spectacle>
    );
  }
}
