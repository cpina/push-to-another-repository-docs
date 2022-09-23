Welcome to github-action-push-to-another-repository's documentation!
====================================================================

This GitHub Action (`github-action-push-to-another-repository`_) pushes files from one GitHub repository to another. For example, on a git push in a `source` repository, files can be pushed into a `destination` repository.

Two of examples of this could be:

- Specifying a directory in a `source` repository to be pushed to a `destination` repository
- Generating some files using another GitHub Action and pushing them into another `destination` repository (e.g. generating PDFs from MarkDown and pushing the PDFs across to the `destination` repository)

The GitHub Action code is shorter than the documentation. It needs some setup and initial configuration which is covered in detail, but hopefully it will not take more than a few minutes.

.. note::
  For a **quickstart** see the :ref:`setup example<generic_example>`.

.. toctree::
  :caption: Table of contents

  overview.rst
  configuration.rst
  setup.rst
  generic-example.rst
  sphinx-example.rst
  troubleshooting.rst
  faq.rst

.. _github-action-push-to-another-repository: https://github.com/cpina/push-to-another-repository-deploy-keys-example
