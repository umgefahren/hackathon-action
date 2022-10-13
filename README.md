# Hackathon action

Sample Configuration

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
          hackathon_end: "2022-10-20T15:02:51Z"
          my_token: ${{ secrets.GITHUB_TOKEN }}
```