Welcome to github-action-push-to-another-repository's documentation!
====================================================================

This GitHub Action (`github-action-push-to-another-repository`_) will help to push files from one GitHub repository to another. For example, on a git push in a `source` repository, files can be pushed into a `destination` repository.

A couple of examples of this could be:

- Specifying a directory in a `source` repository to be pushed to a `destination` repository
- Generating some files using another GitHub Action and pushing them into another `destination` repository (e.g. generate PDFs from MarkDown and push the PDFs across to the `destination` repository)

The GitHub Action code is shorter than the documentation. It needs some setup and initial configuration which is covered in detail here.

.. toctree::
  :caption: Table of contents

  overview.rst
  configuration.rst
  setup.rst
  troubleshooting.rst
  faq.rst

.. _github-action-push-to-another-repository: https://github.com/cpina/push-to-another-repository-deploy-keys-example
