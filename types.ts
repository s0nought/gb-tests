export type SectionSlug =
  | "apps"
  | "articles"
  | "bugs"
  | "blogs"
  | "clubs"
  | "contests"
  | "concepts"
  | "events"
  | "games"
  | "ideas"
  | "jams"
  | "mods"
  | "models"
  | "members"
  | "news"
  | "polls"
  | "projects"
  | "questions"
  | "reviews"
  | "requests"
  | "scripts"
  | "sounds"
  | "sprays"
  | "studios"
  | "threads"
  | "tools"
  | "tuts"
  | "wares"
  | "wikis"
  | "wips";

// type SectionTitleSingular =
//   | "App"
//   | "Article"
//   | "Site Bug"
//   | "Blog"
//   | "Club"
//   | "Contest"
//   | "Concept"
//   | "Event"
//   | "Game"
//   | "Site Idea"
//   | "Jam"
//   | "Mod"
//   | "Model"
//   | "Member"
//   | "News"
//   | "Poll"
//   | "Project"
//   | "Question"
//   | "Review"
//   | "Request"
//   | "Script"
//   | "Sound"
//   | "Spray"
//   | "Studio"
//   | "Thread"
//   | "Tool"
//   | "Tutorial"
//   | "Ware"
//   | "Wiki"
//   | "WiP";

/**
 * "Generator", "Initiative" and "Status Update" are deprecated.
 */
type SectionTitlePlural =
  | "Apps"
  | "Articles"
  | "Bugs"
  | "Blogs"
  | "Clubs"
  | "Contests"
  | "Concepts"
  | "Events"
  | "Games"
  | "Ideas"
  | "Jams"
  | "Mods"
  | "Models"
  | "Members"
  | "News"
  | "Polls"
  | "Projects"
  | "Questions"
  | "Reviews"
  | "Requests"
  | "Scripts"
  | "Sounds"
  | "Sprays"
  | "Studios"
  | "Threads"
  | "Tools"
  | "Tutorials"
  | "Wares"
  | "Wikis"
  | "WiPs";

type GameSubNavigatorEntry =
  | "Main"
  | "Get Started"
  | "Sections"
  | "Featured"
  | "Discussions"
  | "Rules"
  | "Exchange"
  | "Admin"
  | "Add";

type GameSubNavigatorDropdownEntry = SectionTitlePlural | "Withhold";

type SubmissionSubNavigatorEntry =
  | "Overview"
  | "Updates"
  | "Issues"
  | "Admin"
  | "Todos"
  | "License"
  | "Likes"
  | "Subscribers"
  | "Collections"
  | "Edit"
  | "Embed"
  | "Thankers"
  | "Report";

type SubmissionSubNavigatorDropdownEntry =
  | "Ownership Requests"
  | "Permits"
  | "Trash"
  | "Withhold"
  | "Tickets"
  | "History"
  | "Analytics";

export type SubNavigatorEntry =
  | GameSubNavigatorEntry
  | GameSubNavigatorDropdownEntry
  | SubmissionSubNavigatorEntry
  | SubmissionSubNavigatorDropdownEntry;

export type TextEditorViewMode = "Wysiwyg" | "Source" | "Backup";

export type SwitchYesNoOption = "Yes" | "No";

export type SwitchAccessOption = "Public" | "Private";

export type SubmissionFormCategoryTab =
  | "Main"
  | "Ownership"
  | "Media"
  | "Technical"
  | "Development"
  | "Settings"
  | "Admin";

export type SubmissionFormAuthorGroup =
  | "Key Authors"
  | "Original Authors"
  | "Contributors"
  | "Special Thanks";

export type SearchSection = SectionTitlePlural | "Any";

export type SearchField =
  | "Name"
  | "Description"
  | "Blurb/Readme"
  | "Tags"
  | "Studio"
  | "Submitter"
  | "Credits";

export type SearchResultOrder =
  | "Relevance"
  | "Popularity"
  | "Newest"
  | "Updated";
