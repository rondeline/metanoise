#Load libraries
library(here)
library(dplyr)
library(tidyr)
library(janitor)
library(qualtRics)
library(stringr)
library(data.table)
library(ggplot2)
library(rstanarm)

#Load data
metanoise_p2 <- read_survey("metanoise_p2.csv") 

#Set as df
setDF(metanoise_p2)

#Tidy demographic data
metanoise_p2_demographics <- metanoise_p2 |> 
  clean_names() |>
  select(response_id, age_1_4:age_3_4,sex_1_1:traffic_bike, age_caregiver:education_adult) |>
  rename_with(~str_remove(.x, "_\\d+$"), everything()) |> 
  pivot_longer(cols = age_1:diagnosis_3,
               names_to = c(".value", "set"),
               names_pattern = "(.*)_(\\d+)$") |> 
  mutate(set = str_replace(set, "_\\d+$", ""),
         set = as.numeric(set)) |>
  filter(!is.na(age),
         !is.na(sex))

#Tidy trial data
metanoise_p2_trials <- metanoise_p2 |> 
  clean_names() |>
  select(response_id, x1_babble_1:x3_construction_13) |>
  pivot_longer(cols = -response_id,
               names_to = c("set", ".value"),
               names_sep = "(?<=x\\d)_") |> 
  mutate(set = case_when(set == "x1" ~ 1,
                         set == "x2" ~ 2,
                         set == "x3" ~ 3)) |> 
  pivot_longer(cols = -c(response_id, set),
               names_to = "sound",
               values_to = "rating") |> 
  mutate(activity = str_extract(sound, "\\d+$"),
         sound = str_replace(sound, "_\\d+$", ""),
         activity = case_when(
           activity == 1 ~ "listen_story",
           activity == 2 ~ "sleep",
           activity == 3 ~ "learn_game",
           activity == 4 ~ "dance",
           activity == 5 ~ "math",
           activity == 6 ~ "talk_about_day",
           activity == 7 ~ "remember_list",
           activity == 8 ~ "brush_teeth",
           activity == 9 ~ "puzzle",
           activity == 10 ~ "color",
           activity == 11 ~ "read",
           activity == 12 ~ "play",
           activity == 13 ~ "count")) |>
  filter(!is.na(rating))

#Join demographic and trial dfs by response_id and set
metanoise_p2_tidy <- full_join(x = metanoise_p2_trials,
                               y = metanoise_p2_demographics,
                               by = c("response_id", "set")) |>
  arrange(response_id) |> 
  group_by(response_id) |> 
  mutate(subject_id = cur_group_id()) |>
  select(subject_id, everything()) |>
  ungroup() |>
  group_by(activity, sound) |> 
  mutate(rating = case_when(rating == "Very hard" ~ 1,
                            rating == "A little hard" ~ 2,
                            rating == "Neither hard nor easy" ~ 3,
                            rating == "A little easy" ~ 4,
                            rating == "Very easy" ~ 5),
         mean_rating = mean(rating),
         sd_rating = sd(rating))

#Analyze other survey question trends 
metanoise_p2_other_qs <- metanoise_p2_tidy |>
  group_by(subject_id) |> 
  mutate(chaos_commotion = if_else(chaos_commotion == FALSE, 1, 0),
         chaos_zoo = if_else(chaos_zoo == TRUE, 1, 0),
         chaos_talk = if_else(chaos_talk == FALSE, 1, 0),
         chaos_fuss = if_else(chaos_fuss == TRUE, 1, 0),
         chaos_think = if_else(chaos_think == TRUE, 1, 0),
         chaos_relax = if_else(chaos_relax == FALSE, 1, 0),
         chaos_calm = if_else(chaos_calm == FALSE, 1, 0), #Score CHAOS- items 1,2,4,7,12,14,15 = FALSE = items 3,5,6,8,9,10,11,13 = TRUE = 1
         chaos_score = chaos_commotion + chaos_zoo + chaos_talk + chaos_fuss + chaos_think + chaos_relax + chaos_calm,
         door_fit = case_when(door_fit == "Not sure" ~ 0,
                              door_fit == "Serious problem" ~ 3,
                              door_fit == "Minor problem" ~ 2,
                              door_fit == "Not a problem" ~ 1),
         noise_in_home = case_when(noise_in_home == "Not sure" ~ 0,
                                   noise_in_home == "Serious problem" ~ 3,
                                   noise_in_home == "Minor problem" ~ 2,
                                   noise_in_home == "Not a problem" ~ 1),
         noise_other_homes = case_when(noise_other_homes == "Not sure" ~ 0,
                                       noise_other_homes == "Serious problem" ~ 3,
                                       noise_other_homes == "Minor problem" ~ 2,
                                       noise_other_homes == "Not a problem" ~ 1),
         noise_street = case_when(noise_street == "Not sure" ~ 0,
                                            noise_street == "Serious problem" ~ 1,
                                            noise_street == "Minor problem" ~ 2,
                                            noise_street == "Not a problem" ~ 3),
         trash = case_when(trash == "Not sure" ~ 0,
                           trash == "Serious problem" ~ 3,
                           trash == "Minor problem" ~ 2,
                           trash == "Not a problem" ~ 1),
         traffic = case_when(traffic == "Very heavy" ~ 4,
                             traffic == "Quite heavy" ~ 3,
                             traffic == "Not very heavy" ~ 2,
                             traffic == "Hardly any traffic" ~ 1),
         shops_walk = case_when(shops_walk == "Strongly agree" ~ 1,
                                shops_walk == "Somewhat agree" ~ 2,
                                shops_walk == "Neither agree nor disagree" ~ 3,
                                shops_walk == "Somewhat disagree" ~ 4,
                                shops_walk == "Strongly disagree" ~ 5),
         transit_walk = case_when(transit_walk == "Strongly agree" ~ 1,
                                transit_walk == "Somewhat agree" ~ 2,
                                transit_walk == "Neither agree nor disagree" ~ 3,
                                transit_walk == "Somewhat disagree" ~ 4,
                                transit_walk == "Strongly disagree" ~ 5),
         traffic_walk = case_when(traffic_walk == "Strongly agree" ~ 5,
                                  traffic_walk == "Somewhat agree" ~ 4,
                                  traffic_walk == "Neither agree nor disagree" ~ 3,
                                  traffic_walk == "Somewhat disagree" ~ 2,
                                  traffic_walk == "Strongly disagree" ~ 1),
         traffic_bike = case_when(traffic_bike == "Strongly agree" ~ 5,
                                  traffic_bike == "Somewhat agree" ~ 4,
                                  traffic_bike == "Neither agree nor disagree" ~ 3,
                                  traffic_bike == "Somewhat disagree" ~ 2,
                                  traffic_bike == "Strongly disagree" ~ 1)) |> 
  group_by(subject_id, activity, sound)

#Data Visualization
##Performance rating by activity and sound (bar)
ggplot(metanoise_p2_tidy, mapping = aes(x = activity, y = mean_rating, fill = sound)) +
  geom_bar(position = "dodge", stat = "identity") +
  geom_errorbar(aes(y = mean_rating,
                    ymin = mean_rating - sd_rating,
                    ymax = mean_rating + sd_rating),
                position = "dodge",
                width = 0.2) + 
  facet_wrap(~sound) +
  theme(axis.text.x = element_text(angle = 45, hjust = 1))

##Performance rating by activity and sound (scatter)
ggplot(metanoise_p2_tidy, mapping = aes(x = activity, y = rating, col = sound)) +
  geom_point(stat = "identity", alpha = 0.5, position = position_jitter(width = 0.2)) +
  geom_errorbar(aes(y = mean_rating,
                    ymin = mean_rating - sd_rating,
                    ymax = mean_rating + sd_rating),
                position = position_dodge(width = 0.2),
                width = 0.2) + 
  facet_wrap(~sound) +
  theme(axis.text.x = element_text(angle = 45, hjust = 1))

##TV usage by age 
ggplot(metanoise_p2_demographics, mapping = aes(x = age, y= tv, fill = age)) +
  geom_bar(stat = "identity", position = "dodge") +
  geom_errorbar(aes(y = mean_tv,
                    ymin = mean_tv - sd_tv,
                    ymax = mean_tv + sd_tv),
                position = "dodge",
                width = 0.2)

##Performance rating by activity, sound, and age (bar)
ggplot(metanoise_p2_tidy, mapping = aes(x = age, y = mean_rating, fill = sound)) +
  geom_bar(position = "dodge", stat = "identity") +
  geom_errorbar(aes(y = mean_rating,
                    ymin = mean_rating - sd_rating,
                    ymax = mean_rating + sd_rating),
                stat = "identity",
                position = position_dodge(width = 0.9),
                width = 0.2) + 
  facet_wrap(~activity)

##Performance rating by activity, sound, and age (geom_smooth)
ggplot(metanoise_p2_tidy, mapping = aes(x = age, y = rating, col = sound)) +
  geom_point(position = position_dodge(width = 0.2), stat = "identity") +
  geom_smooth(method = "lm") + 
  facet_wrap(~activity)

Ωz#Performance by CHAOS score
ggplot(metanoise_p2_other_qs, mapping = aes(x = rating, y = chaos_score, col = sound)) +
  geom_point(position = position_dodge(width = 0.2), stat = "identity") +
  geom_smooth(method = "lm") + 
  facet_wrap(~activity)


##Model performance
metanoise_glmer <- stan_glmer(rating ~ activity * sound + (1|subject_id),
                              data = metanoise_p2_tidy,
                              family = "gaussian") 
summary(metanoise_glmer)

rating ~ activity * sound * age (1|subject_id)

