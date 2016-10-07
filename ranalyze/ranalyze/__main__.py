"""
Main control flow for the package
"""

from .config import Config
from .database import DatabaseConfigModule
from .scrape import ScrapeConfig


def main():

    config = Config.get_instance()

    config.register_module(DatabaseConfigModule("create-db"))
    config.register_module(ScrapeConfig("scrape"))

    runner = config.parse()

    runner()

if __name__.endswith("__main__"):
    main()