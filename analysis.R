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
library(loo)
library(ggmap)

#Load data
metanoise_s1 <- read_survey("metanoise_s1.csv") 

#Set as df
setDF(metanoise_s1)

#Tidy demographic data
metanoise_s1_demographics <- metanoise_s1 |> 
  clean_names() |>
  select(response_id, age_1_4:age_3_4,sex_1_1:traffic_bike, age_caregiver:education_adult) |>
  rename("adults" = household_breakdown_5,
         "children_6_17" = household_breakdown_6,
         "children_3_5" = household_breakdown_7,
         "children_birth_2" = household_breakdown_8) |> 
  rename_with(~str_remove(.x, "_\\d+$"), everything()) |> 
  pivot_longer(cols = age_1:diagnosis_3,
               names_to = c(".value", "set"),
               names_pattern = "(.*)_(\\d+)$") |> 
  mutate(set = str_replace(set, "_\\d+$", ""),
         set = as.numeric(set)) |>
  filter(!is.na(age),
         !is.na(sex))

#Tidy trial data
metanoise_s1_trials <- metanoise_s1 |> 
  clean_names() |>
  select(response_id, x1_babble_listen_story:x3_construction_count) |>
  
  pivot_longer(cols = -response_id,
               names_to = c("set", ".value"),
               names_sep = "(?<=x\\d)_") |> 
  mutate(set = case_when(set == "x1" ~ 1,
                         set == "x2" ~ 2,
                         set == "x3" ~ 3)) |> 
  pivot_longer(cols = -c(response_id, set),
               names_to = "sound",
               values_to = "rating") |>
  separate(sound, into = c("sound", "activity"), sep = "_", extra = "merge") |> 
  mutate(activity = str_replace_all(activity, "_", " "),
         attention_check = case_when(sound == "ac" ~ activity, TRUE ~ NA_character_)) |>
  filter(!(sound == "ac" & rating != "attention check")) |>  
  filter(!is.na(rating)) |> 
  select(-attention_check)
  

View(metanoise_s1_trials)

#Join demographic and trial dfs by response_id and set
metanoise_s1_tidy <- full_join(x = metanoise_s1_trials,
                               y = metanoise_s1_demographics,
                               by = c("response_id", "set")) |>
  arrange(response_id) |> 
  group_by(response_id, set) |> 
  mutate(subject_id = cur_group_id()) |>
  select(subject_id, everything()) |>
  ungroup() |>
  group_by(activity, sound, age) |>
  filter(diagnosis == "none") |> 
  mutate(rating = case_when(rating == "Very hard" ~ 5,
                            rating == "A little hard" ~ 4,
                            rating == "Neither hard nor easy" ~ 3,
                            rating == "A little easy" ~ 2,
                            rating == "Very easy" ~ 1),
         mean_rating = mean(rating),
         sd_rating = sd(rating), 
         sem_rating = sd(rating)/sqrt(n()), 
         ci_rating = sd(rating)/sqrt(n()) * 1.96) 

View(metanoise_s1_tidy)

#Analyze other survey question trends 
metanoise_s1_other_qs <- metanoise_s1_tidy |>
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
                                  traffic_bike == "Strongly disagree" ~ 1),
         neighborhood_score = door_fit + noise_in_home + noise_other_homes + noise_street + trash +
         traffic + transit_walk + traffic_walk + traffic_bike,
         mean_neighborhood_score = mean(neighborhood_score))
#39
View(metanoise_s1_other_qs)

#Baseline model
baseline_model <- stan_glm(rating ~ 1,
                           family = "gaussian",
                           data = metanoise_s1_other_qs)

#Single interaction model
set.seed(99)
singleinteraction_model <- stan_glm(rating ~ sound * activity,
                                    family = "gaussian",
                                    data = metanoise_s1_other_qs)

#Full model
cl <- makeCluster(detectCores())
registerDoParallel(cl)

set.seed(283)
full_model <- stan_glmer(rating ~ sound * activity + chaos_score + (sound * activity |subject_id),
                    family = "gaussian",
                    cores = 4,
                    chains = 4,
                    data = metanoise_s1_other_qs)

stopCluster(cl)

summary(full_model)

full_model_df <- summary(full_model)

# Compute the LOOIC (leave-one-out information criterion)
loo_full_model <- loo(full_model)

View(loo_full_model)

# Extract AIC and BIC from the LOO result
AIC <- loo_result$estimates["elpd_loo"] * 2
BIC <- loo_result$estimates["elpd_loo"] * log(nrow(your_data)) * 2

singleinteraction_model_df <- as.data.frame(singleinteraction_model)
summary(baseline_model)
summary(singleinteraction_model)
View(singleinteraction_model_df)

#Data Visualization
##Performance rating by activity and sound (bar)
ggplot(metanoise_s1_tidy, mapping = aes(x = activity, y = mean_rating, fill = sound)) +
  geom_bar(position = "dodge", stat = "identity") +
  geom_errorbar(aes(y = mean_rating,
                    ymin = mean_rating - sd_rating,
                    ymax = mean_rating + sd_rating),
                position = "dodge",
                width = 0.2) + 
  facet_wrap(~sound) +
  theme(axis.text.x = element_text(angle = 45, hjust = 1))

##Performance rating by activity and sound (scatter)
ggplot(metanoise_s1_tidy, mapping = aes(x = sound, y = rating, col = sound)) +
  geom_point(stat = "identity", alpha = 0.1, position = position_jitter(width = 0.2, height = 0.2)) +
  geom_errorbar(aes(y = mean_rating,
                    ymin = mean_rating - sd_rating,
                    ymax = mean_rating + sd_rating),
                position = position_dodge(width = 0.2),
                width = 0.2) + 
  geom_point(aes(y = mean_rating), col = "black", size = 10, pch = "-") +
  facet_wrap(~activity) +
  theme(axis.text.x = element_text(angle = 45, hjust = 1))

## Mike meeting plot
# making an ordered predictor
metanoise_s1_tidy$activity_ordered <-
  forcats::fct_reorder(metanoise_s1_tidy$activity, 
                       desc(metanoise_s1_tidy$mean_rating))

ggplot(metanoise_s1_tidy, mapping = aes(x = activity_ordered, y = mean_rating, 
                                        col = sound)) +
  geom_point(position = position_dodge(width = .3))+
  geom_linerange(aes(ymin = mean_rating - ci_rating,
                     ymax = mean_rating + ci_rating),
                 position = position_dodge(width = .3)) + 
  geom_line(aes(group=sound)) +
  ylim(1,5.5) +
  xlab("Activity") + 
  ylab("Rating (Very Easy - Very Hard)") +
  theme_bw()+ 
  theme(axis.text.x = element_text(angle = 45, hjust = 1))
  
##Performance rating by activity, sound, and age (bar)
ggplot(metanoise_s1_tidy, mapping = aes(x = age, y = mean_rating, col = sound)) +
  geom_point(aes(group = sound), position = position_jitter(width = 0.2, height = 0.2), alpha = 0.3, stat = "identity") +
  geom_smooth(method = "lm") +
  facet_wrap(~activity) +
  ylab("Mean Rating (Very Hard - Very Easy)")
  
  geom_errorbar(aes(y = mean_rating,
                    ymin = mean_rating - sd_rating,
                    ymax = mean_rating + sd_rating),
                stat = "identity",
                position = position_dodge(width = 0.9),
                width = 0.2) + 
  facet_wrap(~activity)

##Performance rating by activity, sound, and age (geom_smooth)
ggplot(metanoise_s1_tidy, mapping = aes(x = age, y = rating, col = sound)) +
  geom_smooth(method = "lm") + 
  facet_wrap(~activity)

#geom_point(position = position_dodge(width = 0.2)) +

##Do parents think kids do better with age?
ggplot(metanoise_s1_tidy, mapping = aes(x = age, y = rating, col = sound)) +
  geom_smooth(method = "lm") 

ggplot(metanoise_s1_tidy, mapping = aes(x = age, y = rating, col = sound)) +
  geom_smooth(method = "lm") + 
  facet_wrap(~activity)

mod <- lme4::lmer(rating ~ age * activity * sound + (1|subject_id), 
           data = metanoise_s1_tidy)
summary(mod)

mod <- lme4::lmer(rating ~ age * sound + (1|subject_id) + (age|activity), 
                  data = metanoise_s1_tidy)
summary(mod)


#Ratings by CHAOS score
ggplot(metanoise_s1_other_qs, mapping = aes(x = rating, y = chaos_score, col = sound)) +
  geom_point(position = position_dodge(width = 0.2), stat = "identity") +
  geom_smooth(method = "lm") + 
  facet_wrap(~activity) +
  xlab("Rating (Very Easy - Very Hard)")

#Ratings by traffic patterns

##Density plot
ggplot(metanoise_s1_other_qs, mapping = aes(x = neighborhood_score)) +
  geom_density(fill = "skyblue", color = "blue")

ggplot(check, mapping = aes(x = noise, y = mean_rating_c, col = sound)) +
  geom_boxplot() +
  geom_point(position = position_jitter(width = 0.2), stat = "identity", alpha = 0.5) +
  geom_linerange(aes(ymin = mean_rating_c - ci_rating_c,
                     ymax = mean_rating_c + ci_rating_c),
                 position = position_dodge(width = .3))

check <- metanoise_s1_other_qs |>
  ungroup() |>
  mutate(neighborhood_resource = case_when(neighborhood_score <= 13 ~ 3,
                                           neighborhood_score > 13 & neighborhood_score < 26 ~ 2,
                                           neighborhood_score > 26 ~ 1),
         noise = door_fit + noise_in_home + noise_other_homes + noise_street + traffic) |> 
  group_by(sound, activity) |> 
  summarise(mean_rating_c = mean(rating),
            sd_rating_c = sd(rating), 
            sem_rating_c = sd(rating)/sqrt(n()), 
            ci_rating_c = sd(rating)/sqrt(n()) * 1.96,
            n = n(),
            neighborhood_resource = neighborhood_resource,
            noise = noise,
            subject_id = subject_id) |> 
  select(subject_id, everything())


View(check)

lat_lon <- metanoise_s1 |>
  select(LocationLatitude, LocationLongitude) |> 
  clean_names() |> 
  na.omit() 

convert_to_zip <- function(location_longitude, location_latitude) {
  address <- revgeocode(c(location_longitude, location_latitude), output = "postalCode")
  return(address)
}

test_address <- revgeocode(c(-74.0060, 40.7128), output = "postalCode")
print(test_address)

convert_to_zip <- function(location_longitude, location_latitude) {
  print(paste("Longitude:", location_longitude, "Latitude:", location_latitude)) # Diagnostic print
  address <- revgeocode(c(location_longitude, location_latitude), output = "postalCode")
  print(address) # Diagnostic print
  return(address)
}

# Pipe dataframe into conversion function and create a new column for zip codes
geo <- lat_lon %>%
  mutate(zip_code = mapply(convert_to_zip, location_longitude, location_latitude))

# Print the result
print(geo)

##Model performance
metanoise_glmer <- stan_glmer(rating ~ activity * sound + (1|subject_id),
                              data = metanoise_p2_tidy,
                              family = "gaussian") 
summary(metanoise_glmer)

rating ~ activity * sound * age (1|subject_id)

