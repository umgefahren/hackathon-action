import * as core from '@actions/core'
import * as github from '@actions/github'

import {DateTime} from 'luxon'

async function run(): Promise<void> {
  try {
    const myToken = core.getInput('my_token')

    const octokit = github.getOctokit(myToken)

    const {owner, repo} = github.context.repo

    const hackathon_end_string: string = core.getInput('hackathon_end')
    const hackathon_end = DateTime.fromISO(hackathon_end_string)

    core.debug(`Hackathon End in Unix: ${hackathon_end.toUnixInteger()}`)
    core.debug(`Now in Unix: ${DateTime.now().toUnixInteger()}`)

    /*
    if (hackathon_end.toUnixInteger() < DateTime.now().toUnixInteger()) {
      core.setFailed('Disable this workflow, the hackathon should be over')
    }
    */

    const diff = hackathon_end.diffNow()

    const issue_number_string: string = core.getInput('issue_number')
    const issue_number = parseInt(issue_number_string)

    const comments = await octokit.rest.issues.listComments({
      owner,
      repo,
      issue_number
    })

    const body = `# Hackathon countdown\n\nTime Left: ${diff.toHuman()}`

    core.debug(`Body: \n ${body}`)

    const comment_opt = comments.data.find(
      c => c.user?.type === 'Bot' && c.user.login === 'github-actions[bot]'
    )

    if (comment_opt === undefined) {
      await octokit.rest.issues.createComment({
        owner,
        repo,
        issue_number,
        body
      })
    } else {
      await octokit.rest.issues.updateComment({
        owner,
        repo,
        comment_id: comment_opt.id,
        body
      })
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
