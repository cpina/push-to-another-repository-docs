.. _generic_example:

.. warning::
  **TL;DR:** this repository is not maintained for any new development. I plan to
  fix issues if they arise due to changes on GitHub, to minimise disruption of
  existing usage.

  My circumstances changed since I started the GitHub Action in 2020. I am not
  able to add functionality to it or fix issues.

  The action is 175 lines of shell script. Feel free to fork it and modify it
  for your own use case.

  If you create a fork that might replace this one, I will add a note in the
  documentation and the README.md. Please, open an issue and I will do it.

==============
Example setup
==============

This example shows both setup methods. This is part of a *GitHub workflow* Action, for example, in your repository: ``.github/workflow/ci.yml``.

Note that only one of the lines, ``SSH_DEPLOY_KEY`` or ``API_TOKEN_GITHUB``, are needed :ref:`according to the chosen setup<setup>` that is being used.

.. code-block:: yaml
 :emphasize-lines: 17-

 name: CI

 on:
   push:
     branches: [ main ]
   pull_request:
     branches: [ main ]

 jobs:
   build:
     runs-on: ubuntu-latest
     container: pandoc/latex    # "ubuntu" is a more generic container
                                # using "pandoc/latex" because of dependencies
                                # used in the specific "build.sh"
     steps:
       - uses: actions/checkout@v2
       - name: creates output
         run:  sh ./build.sh # some command from your repository that creates
                             # output to "source-directory" ("output" in the example)
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

See the file `ci.yml`_ from the `origin repository`_ to push to the `destination repository`_.

Besides the variables used in the example (``source-destination``, ``destination-github-username``, ``destination-repository-name``, ``user-email`` and ``target-branch``) there are other available variables:

#. ``destination-repository-username``: defaults to same as origin
#. ``commit-message``: defaults to ``Update from ORIGIN_COMMIT``
#. ``target-directory``: defaults to "/" in the destination repository
#. ``github-server``: defaults to ``github.com``
#. ``create-target-branch-if-needed``: defaults to ``false``

See the variables's documentation in :ref:`configuration<configuration>`.

.. _ci.yml: https://github.com/cpina/push-to-another-repository-deploy-keys-example/blob/main/.github/workflows/ci.yml
.. _origin repository: https://github.com/cpina/push-to-another-repository-deploy-keys-example
.. _destination repository: https://github.com/cpina/push-to-another-repository-output
