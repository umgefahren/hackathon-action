# Hackathon action

Notifies you about how much time is left in the hackathon.

## Inputs

## `issue_number`

The action will post a comment under the issue with this comment with the progress.

## `hackathon_end`

When the hackathon will end. Formatted in `MM/dd/yyyy hh:mm:s` (i.e. `10/17/2022 22:08:23`).

## `my_token`

A token to use with the GitHub Api. just pass `${{ secrets.GITHUB_TOKEN }}`.


## Outputs

None

## Example Usage

Updates countdown every 10 minutes.

```yaml
name: 'Hackathon Timer'
on:
  schedule:
    - cron: '10 * * * *'

jobs:
  test: # make sure the action works on a clean machine without building
    runs-on: ubuntu-latest
    steps:
      - uses: hackathon-action@v1
        with:
          issue_number: 10
          hackathon_end: "10/17/2022 22:08:23"
          my_token: ${{ secrets.GITHUB_TOKEN }}
```