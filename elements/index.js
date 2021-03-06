import { element } from 'deku'


let text = `
:'########::'########::::'#####:::'##::::'##:'####:'##::::'##:'##::::'##::'######::
: ##.... ##: ##.... ##::'##.. ##::. ##::'##::. ##:: ###::'###: ##:::: ##:'##... ##:
: ##:::: ##: ##:::: ##:'##:::: ##::. ##'##:::: ##:: ####'####: ##:::: ##: ##:::..::
: ########:: ########:: ##:::: ##:::. ###::::: ##:: ## ### ##: ##:::: ##:. ######::
: ##.....::: ##.. ##::: ##:::: ##::: ## ##:::: ##:: ##. #: ##: ##:::: ##::..... ##:
: ##:::::::: ##::. ##::. ##:: ##::: ##:. ##::: ##:: ##:.:: ##: ##:::: ##:'##::: ##:
: ##:::::::: ##:::. ##::. #####::: ##:::. ##:'####: ##:::: ##:. #######::. ######::
:..:::::::::..:::::..::::.....::::..:::::..::....::..:::::..:::.......::::......:::`




const githubBanner = <a href="https://github.com/metadevfoundation/proximus" class="gh-banner">
  <img src="https://camo.githubusercontent.com/c6286ade715e9bea433b4705870de482a654f78a/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f6c6566745f77686974655f6666666666662e706e67"
  alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_left_white_ffffff.png" /></a>

let Ascii = {
  render: c => <div class="proximus"><pre>{text}{c.props.children}</pre></div>
}

let GithubBanner = {
  render: () => githubBanner
}

import { Grid, GridItem } from './grid'
export default {
  Ascii,
  GithubBanner,
  Grid,
  GridItem,
}