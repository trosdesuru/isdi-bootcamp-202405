#!/bin/zsh

# Remote repository URL on GitHub
remote_repo="https://github.com/trosdesuru/isdi-bootcamp-202405.git"

# Function to check the existence and status of the remote repository
check_remote_repo() {
    # Check if the repository exists and has commits
    if git ls-remote "$remote_repo" HEAD &>/dev/null; then
        echo -e "\033[32mRemote repository found and accessible.\033[0m"
        return 0
    else
        echo -e "\033[31mError: Remote repository not found or empty.\033[0m"
        return 1
    fi
}

# Function to update all local branches with the remote version
update_branches() {
    git fetch origin  # Fetch all updates from the remote repository

    # List of local branches to synchronize
    local_branches=(
        "develop"
        "feature/playground"
        "feature/ponies"
        "main"
    )

    # Iterate over all local branches and update them
    for local_branch in "${local_branches[@]}"; do
        git checkout $local_branch
        git pull origin $local_branch
    done

    echo -e "\033[32mAll local branches have been updated.\033[0m"
}

# Function to display a progress bar
progress_bar() {
    local duration=$1
    local increment=2
    local progress=0
    local completed=0
    local total=50

    echo -n "["
    while [ $progress -le $total ]; do
        for i in $(seq 1 $progress); do echo -n "#"; done
        for i in $(seq $((progress + 1)) $total); do echo -n " "; done
        echo -n "] $((progress * 2))%"
        sleep $increment
        progress=$((progress + 1))
        if [ $progress -gt $total ]; then
            break
        fi
        echo -ne "\r["
    done
    echo
}

# Execute the synchronization process
if check_remote_repo; then
    echo "Updating local branches..."
    progress_bar 50
    update_branches
else
    echo -e "\033[31mFailed to synchronize due to issues with the remote repository.\033[0m"
fi

