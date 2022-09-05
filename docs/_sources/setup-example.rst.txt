.. _setup_example:

==============
Example set up
==============

This example shows both set up methods. Only one of the lines, ``SSH_DEPLOY_KEY`` or ``API_TOKEN_GITHUB``, is needed according to the set up method that is being used. Do not include the other line.

.. code-block:: yaml

      - name: Pushes to another repository
        uses: cpina/github-action-push-to-another-repository@main
        env:
          SSH_DEPLOY_KEY: ${{ secrets.SSH_DEPLOY_KEY }}
          API_TOKEN_GITHUB: ${{ secrets.API_TOKEN_GITHUB }}
        with:
          source-directory: 'output'
          destination-github-username: 'cpina'
          destination-repository-name: 'pandoc-test-output'
          user-email: carles3@pina.cat
          target-branch: main

Working example:

https://github.com/cpina/push-to-another-repository-deploy-keys-example/blob/main/.github/workflows/ci.yml

Generates files from:
https://github.com/cpina/push-to-another-repository-deploy-keys-example

and pushes them to:
https://github.com/cpina/push-to-another-repository-output
