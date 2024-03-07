---
  title: "MetaNoise"
author: "Rondeline M. Williams"
date: '2024-03-05'
output: html_document
---
  
  #Load libraries
library(here)
library(dplyr)
library(tidyr)
library(janitor)
library(qualtRics)
library(stringr)
library(data.table)

#Load data
metanoise_p1 <- read_survey("metanoise_p1.csv") 

#Set as df
setDF(metanoise_p1)

#Tidy data
metanoise_p1_tidy <- metanoise_p1 |> 
  clean_names() |> 
  mutate(subject_id = row_number()) |> 
  select(eligible_children:questions, -c(q547_1:q547_7)) |> 
  rename(
    "multi_household" = "q543",
    "number_multi_household" = "q544",
    "house_type" = "q545",
    "other_house_type" = "q545_8_text",
    "tv_hours" = "q546",
    "commotion" = "q548",
    "zoo" = "q549",
    "no_interrupted" = "q550",
    "fuss" = "q551",
    "no_think" = "q552",
    "relax" = "q553",
    "calm" = "q554",
    "bad_fitted_doors" = "q555_1",
    "noise_between_rooms" = "q555_2",
    "noise_other_homes" = "q555_3",
    "noise_streets" = "q555_4",
    "trash" = "q555_5",
    "traffic" = "q556",
    "stores_walking" = "q558",
    "publictrans_walking" = "q559",
    "traffic_walking" = "q560",
    "traffic_biking" = "q561",
    "overall_experience" = "q292",
    "clarity" = "q293",
    "errors" = "q294"
  ) |> 
  pivot_longer(cols = o1_babble_1:music_o4_13,
               names_to = "sound",
               values_to = "rating") |> 
  mutate(
    activity = case_when(
      str_detect(sound, "_1$") ~ "listen_story",
      str_detect(sound, "_2$") ~ "sleep",
      str_detect(sound, "_3$") ~ "learn_game",
      str_detect(sound, "_4$") ~ "dance",
      str_detect(sound, "_5$") ~ "math",
      str_detect(sound, "_6$") ~ "talk_about_day",
      str_detect(sound, "_7$") ~ "remember_list",
      str_detect(sound, "_8$") ~ "brush_teeth",
      str_detect(sound, "_9$") ~ "puzzle",
      str_detect(sound, "_10$") ~ "color",
      str_detect(sound, "_11$") ~ "read",
      str_detect(sound, "_12$") ~ "play",
      str_detect(sound, "_13$") ~ "count"
    ),
    order = str_extract(sound, "(o[1-4])"),
    sound = case_when(
      str_detect(sound, "babble") ~ "babble",
      str_detect(sound, "music") ~ "music",
      str_detect(sound, "silence") ~ "silence",
      str_detect(sound, "construction") ~ "construction")) |> 
  pivot_longer(cols = child_age:children_ages_3_4,
               names_pattern = "(.*)",
               values_to = "age") |> 
  pivot_longer(cols = c(sex, sex_multiple_number_1_1,sex_multiple_number_1_2, sex_multiple_number_1_3),
               names_pattern = "(.*)",
               values_to = "sex") |> 
  pivot_longer(cols = c(gender, gender_multiple_number_1_1,gender_multiple_number_1_2,gender_multiple_number_1_3),
               names_pattern = "(.*)",
               values_to = "gender") |> 
  pivot_longer(cols = c(hispanic, hispanic_multiple_number_1_1,hispanic_multiple_number_1_2,hispanic_multiple_number_1_3),
               names_pattern = "(.*)",
               values_to = "hispanic") |> 
  pivot_longer(cols = c(race, race_multiple_number_1_1,race_multiple_number_1_2,race_multiple_number_1_3),
               names_pattern = "(.*)",
               values_to = "race") |> 
  pivot_longer(cols = c(hearing, hearing_multiple_number_1_1,hearing_multiple_number_1_2,hearing_multiple_number_1_3),
               names_pattern = "(.*)",
               values_to = "hearing") |> 
  pivot_longer(cols = c(device_238, device_multiple_number_1_1,device_multiple_number_1_2,device_multiple_number_1_3),
               names_pattern = "(.*)",
               values_to = "device") |> 
  filter(
    !is.na(rating),
    !is.na(gender),
    !is.na(age),
    !is.na(sex),
    !is.na(hispanic),
    !is.na(race),
    !is.na(hearing),
    !is.na(device)
  ) |> 
  select(-c(number_sex, number_gender, number_children, number_hispanic, number_race, number_hearing, number_device)) |> 
  select(age, sex, gender, everything())

View(metanoise_p1_tidy)

