.. _usage

=============
Configuration
=============

The variables below set up the behaviour of the GitHub Action.

-------------------------------
``source-directory`` (argument)
-------------------------------
Directory that the GitHub Action will push files from.

.. note::
  It can be ``.`` to push all the repository, but read the FAQ.

------------------------------------------
``destination-github-username`` (argument)
------------------------------------------

Username/Organization of the GitHub repository that will be used for the ``destination`` repository. To output to a repository such as https://github.com/cpina/push-to-another-repository-output this variable would be ``cpina`` .

------------------------------------------
``destination-repository-name`` (argument)
------------------------------------------

Name of the ``destination`` repository. To output to a repository such as https://github.com/cpina/push-to-another-repository-output this variable would be ``push-to-another-repository-output`` .

.. warning::

  The GitHub Action deletes all the files and directories in the **destination directory**.

------------------------------------
``user-email`` (argument) [optional]
------------------------------------

The email that will be used for the commit to the ``destination-repository-name``. Used for the "Author" of the generated commit.

If it is not specified the commit will not have the author's email in the commit.

-----------------------------------
``user-name`` (argument) [optional]
-----------------------------------

The name that will be used for the commit to the destination-repository-name. If not specified, the ``destination-github-username`` will be used instead.

---------------------------------------------------------
``destination-repository-username`` (argument) [optional]
---------------------------------------------------------

The Username/Organization for the destination repository, if different from ``destination-github-username``. For the repository https://github.com/cpina/push-to-another-repository-output this variable would be ``cpina`` .

---------------------------------------
``target-branch`` (argument) [optional]
---------------------------------------

The branch name for the destination repository. It defaults to ``main`` .

----------------------------------------
``commit-message`` (argument) [optional]
----------------------------------------

The commit message to be used in the output repository. Optional and defaults to ``Update from ORIGIN_COMMIT``.

The string ``ORIGIN_COMMIT`` is replaced by ``$ORIGIN_REPOSITORY_URL@commit``.


------------------------------------------
``target-directory`` (argument) [optional]
------------------------------------------

The directory to wipe and replace in the target repository. Defaults to wiping the entire destination repository.
