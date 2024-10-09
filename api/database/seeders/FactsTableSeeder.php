<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FactsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $facts = [
            [
                'goal' => 'Health',
                'title' => 'Increased Risk of Diseases',
                'fact' => 'Drinking alcohol can increase your risk of alcohol-related illness and injury including liver disease, bowel cancer, breast cancer, throat cancer, heart disease, stroke.',
            ],
            [
                'goal' => 'Health',
                'title' => 'Cardiovascular Effects',
                'fact' => 'Alcohol can affect your cardiovascular system - raises blood pressure and triglycerides (especially after binge drinking), damage to the heart muscle and stroke.',
            ],
            [
                'goal' => 'Health',
                'title' => 'Nervous System Impact',
                'fact' => 'Alcohol can affect your nervous system – affects coordination, self-control, judgement and reaction times. May also cause nerve and brain damage, tremors and dementia.',
            ],
            [
                'goal' => 'Health',
                'title' => 'Recommended Intake',
                'fact' => 'Healthy adults should drink no more than 10 standard drinks in a week, and no more than 4 standard drinks on any one day.',
            ],
            [
                'goal' => 'Religious',
                'title' => 'Religious Views on Alcohol',
                'fact' => 'Most religions condemn alcohol because it induces a loss of self-control.',
            ],
            [
                'goal' => 'Money',
                'title' => 'Cost of Social Drinking',
                'fact' => 'Even occasional social drinking can add up. For example, a $15 cocktail at a bar can quickly turn a $30 meal into a $60 outing, impacting savings if repeated frequently.',
            ],
            [
                'goal' => 'Energy',
                'title' => 'Decreased Energy Levels',
                'fact' => 'Alcohol can lead to decreased energy and fatigue, both in the short and long term. While it might initially provide a sense of increased energy or confidence, it eventually acts as a depressant, reducing overall energy levels.',
            ],
            [
                'goal' => 'Energy',
                'title' => 'Disrupted Sleep Patterns',
                'fact' => 'While alcohol can help some people fall asleep faster, it disrupts REM sleep, which is the most restorative phase of the sleep cycle. This leads to poorer sleep quality, making people feel less rested and more fatigued, negatively affecting energy levels throughout the day.',
            ],
            [
                'goal' => 'Energy',
                'title' => 'Reduced Sleep Quality',
                'fact' => 'Studies show that even small amounts of alcohol before bed can reduce sleep quality by 9-24%, leading to lower energy and productivity the next day.',
            ],
            [
                'goal' => 'Energy',
                'title' => 'Hangover Effects',
                'fact' => 'The aftereffects of alcohol, such as hangovers, can cause extreme lethargy, reduced concentration, and overall energy depletion the following day.',
            ],
            [
                'goal' => 'Money',
                'title' => 'Impulsive Spending',
                'fact' => 'Alcohol impairs judgment, which can lead to spontaneous or impulsive purchases that wouldn’t happen otherwise. This “drunk spending” phenomenon is real, with surveys showing that many people have made online purchases or overspent while under the influence.',
            ],
            [
                'goal' => 'Money',
                'title' => 'Accumulating Debt',
                'fact' => 'People who spend excessively on alcohol, especially in social or nightlife settings, might turn to credit cards or loans to sustain their habits, leading to accumulating debt. This can quickly snowball due to high-interest rates, creating a significant obstacle to building savings.',
            ],
            [
                'goal' => 'Money',
                'title' => 'Increased Medical Expenses',
                'fact' => 'Heavy or chronic drinking can lead to increased medical expenses, such as the cost of treating alcohol-related conditions (liver disease, heart issues) or paying higher health insurance premiums.',
            ],
            [
                'goal' => 'Religious',
                'title' => 'Spiritual Clarity and Discipline',
                'fact' => 'In several spiritual traditions, especially ascetic or monastic ones, alcohol is prohibited as it is considered an obstacle to spiritual clarity and discipline. Monks, nuns, and other ascetics often abstain from alcohol to avoid distractions and maintain a state of spiritual purity.',
            ],
            [
                'goal' => 'Religious',
                'title' => 'Focus on Self-Realization',
                'fact' => 'Most religions believe that refraining from indulgent substances leads to greater spiritual focus, enabling deeper meditation and self-realization.',
            ],
        ];

        DB::table('facts')->insert($facts);
    }
}
