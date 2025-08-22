## Experiment 3 modeling results 
# KN - 6/18/25

#libraries
library(tidyverse)

#load parameter estimates from non-blockwise model
param_ests <- read_csv("results/individ_params.csv")

#select betas
beta_ests <- param_ests %>%
  select(age, βMF = βTD_1, βMB = βMB1, βSR = βSR1) %>%
  pivot_longer(
    cols = c(βMF, βMB, βSR),
    names_to = "parameter", 
    values_to = "est")

beta_ests$parameter <- factor(beta_ests$parameter, 
                     levels = c("βMB", "βSR", "βMF"),
                     labels = c("βMB", "βSR", "βMF"))

#plot
beta_age_plot <- ggplot(beta_ests, aes(x = age, y = est)) +
  geom_point(alpha = .5, color = "#B27EE0") +
  geom_smooth(method = "lm", color = "#501b80", fill = "#501b80") +
  facet_wrap(~parameter) +
  labs(
    x = "Age",
    y = "Estimate"
  ) +
  theme_classic(base_size = 12) +
  theme(legend.position = "none")
beta_age_plot

#save
ggsave("results/beta_age_plot.png", plot = beta_age_plot, width = 5, height = 3, dpi=600)



#load parameter estimates from blockwise model
arb_param_ests <- read_csv("results/arbitration_individ_params.csv")

#select ws
w_ests <- arb_param_ests %>%
  select(age, wSR1, wSR2, ) %>%
  pivot_longer(
    cols = c(wSR1, wSR2),
    names_to = "parameter", 
    values_to = "est") %>%
  mutate(age_group = case_when(age < 13 ~ "Children",
                               age >=12.99 & age < 18 ~ "Adolescents",
                               age >= 17.99 ~ "Adults")) 

w_ests$age_group <- factor(w_ests$age_group, levels = c("Children", "Adolescents", "Adults"))


# plot
w_plot2 <- ggplot(w_ests, aes(x = parameter, y = est)) +
  facet_wrap(~age_group) +
  geom_line(aes(group = age), color = "#B27EE0", size = .1) +
  geom_point(alpha = .5, color = "#501b80") +
 # scale_color_manual(values = c("cadetblue3", "cadetblue1")) +
  theme_classic(base_size = 12) +
  theme(legend.position = "none") +
  xlab("Block Type") +
  ylab("wSR Estimate") +
  scale_x_discrete(labels = c("Congruent", "Incongruent"))
w_plot2

#save
ggsave("results/w_plot.png", plot = w_plot2, width = 5.5, height = 3, dpi=600)

