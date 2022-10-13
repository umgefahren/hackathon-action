import * as core from '@actions/core'
import * as github from '@actions/github'

import {DateTime} from 'luxon'

async function run(): Promise<void> {
  try {
    const myToken = core.getInput('my_token')

    const octokit = github.getOctokit(myToken)

    const {owner, repo} = github.context.repo

    const issue_number_string: string = core.getInput('issue_number')
    const issue_number = parseInt(issue_number_string)

    const comment = await octokit.rest.issues.createComment({
      owner,
      repo,
      issue_number,
      body: 'Action comment'
    })

    core.debug(`Association: ${comment.data.author_association}`)
    core.debug(`User: ${comment.data.user?.name}`)
    core.debug(JSON.stringify(comment.data.user))

    /*
    const comments = await octokit.rest.issues.listComments({
      owner,
      repo,
      issue_number
    })
    */

    // comments.data.find((comment) => comment.user.)

    const hackathon_end_string: string = core.getInput('hackathon_end')
    const hackathon_end = DateTime.fromISO(hackathon_end_string)

    const diff = hackathon_end.diffNow()
    core.debug(`Diff: ${diff.days}`)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
