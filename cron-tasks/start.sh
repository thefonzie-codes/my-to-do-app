#!/bin/bash
# Start the cron service
cron
# Tail the cron log file to keep the container running
tail -f /var/log/cron.log
