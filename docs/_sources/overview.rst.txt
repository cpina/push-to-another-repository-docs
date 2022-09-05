.. _overview:

=========
Overview
=========

There are two ways to set up this GitHub action:

- Using SSH deploy keys (recommended, a bit harder to set up): `push-to-another-repository-deploy-keys-example`_. The configuration is in the file `ci.yml (ssh keys)`_.
- Using a Personal Access Token (first iteration, not recommended but easier to set up: `push-to-another-repository-example`_. The configuration is in the file `ci.yml (token)`_.

Once the setup using one of the methods above has been done, in the examples, the file `build.sh`_ (depending on your GitHub workflow) is executed, creating a new directory ``output/``, and this directory is copied across to the `destination repository`_.

.. warning:: Please bear in mind that the files in the specified directory of the target repository are deleted unless the option `target-directory` is used (in this case, only the files for this directory are deleted).

--------
Features
--------

- Authentication: using SSH deploy keys or GitHub Personal Access Token (see :ref:`Setup <setup>`.)
- Support github.com server and also GitHub for Enterprise (via configuration :ref:`github-server` <github-server-configuration>.)
- Specify in the configuration the source directory and destination directory and repository
- Change the commit message
- Documentation include example how to filter files or directories

.. _push-to-another-repository-deploy-keys-example: https://github.com/cpina/push-to-another-repository-deploy-keys-example
.. _ci.yml (ssh keys): https://github.com/cpina/push-to-another-repository-deploy-keys-example/blob/main/.github/workflows/ci.yml#L21
.. _push-to-another-repository-example: https://github.com/cpina/push-to-another-repository-example
.. _ci.yml (token): https://github.com/cpina/push-to-another-repository-example/blob/main/.github/workflows/ci.yml#L21
.. _build.sh: https://github.com/cpina/push-to-another-repository-deploy-keys-example/blob/main/build.sh
.. _destination repository: https://github.com/cpina/push-to-another-repository-output