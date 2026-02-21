import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer';
import type { AnalysisResult, ProfitLeak, RoadmapPhase } from './claude';

const styles = StyleSheet.create({
  page: {
    padding: 48,
    fontFamily: 'Helvetica',
    backgroundColor: '#FFFFFF',
    fontSize: 10,
  },
  header: {
    backgroundColor: '#0F2847',
    padding: 24,
    marginBottom: 20,
    borderRadius: 4,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 4,
  },
  headerSub: {
    color: '#93C5FD',
    fontSize: 10,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 20,
  },
  scoreBig: {
    fontSize: 44,
    fontFamily: 'Helvetica-Bold',
    color: '#0F2847',
  },
  scoreInfo: {
    flexDirection: 'column',
  },
  scoreLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  scoreBadge: {
    backgroundColor: '#EFF6FF',
    color: '#1D4ED8',
    fontSize: 10,
    padding: '4 8',
    borderRadius: 4,
  },
  savingsBanner: {
    backgroundColor: '#ECFDF5',
    borderRadius: 4,
    padding: 16,
    marginBottom: 20,
    borderLeft: '4px solid #22C55E',
  },
  savingsAmount: {
    fontSize: 26,
    fontFamily: 'Helvetica-Bold',
    color: '#065F46',
    marginBottom: 2,
  },
  savingsSub: {
    fontSize: 10,
    color: '#047857',
  },
  sectionTitle: {
    fontSize: 13,
    fontFamily: 'Helvetica-Bold',
    color: '#0F2847',
    marginBottom: 10,
    paddingBottom: 4,
    borderBottom: '1px solid #E5E7EB',
    marginTop: 16,
  },
  summaryText: {
    fontSize: 10,
    color: '#374151',
    lineHeight: 1.6,
    marginBottom: 16,
  },
  leakCard: {
    border: '1px solid #E5E7EB',
    borderRadius: 4,
    padding: 12,
    marginBottom: 10,
    borderLeft: '4px solid #0F2847',
  },
  leakTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#111827',
    marginBottom: 4,
  },
  leakMetrics: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 6,
  },
  leakSavings: {
    fontSize: 10,
    color: '#065F46',
    fontFamily: 'Helvetica-Bold',
  },
  leakHours: {
    fontSize: 10,
    color: '#1D4ED8',
  },
  leakDesc: {
    fontSize: 10,
    color: '#4B5563',
    lineHeight: 1.5,
    marginBottom: 6,
  },
  leakSolution: {
    fontSize: 10,
    color: '#1D4ED8',
    fontStyle: 'italic',
  },
  priorityBadge: {
    fontSize: 9,
    padding: '2 6',
    borderRadius: 3,
    marginBottom: 6,
  },
  roadmapPhase: {
    marginBottom: 12,
    padding: 10,
    backgroundColor: '#F9FAFB',
    borderRadius: 4,
  },
  phaseTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#0F2847',
    marginBottom: 2,
  },
  phaseTimeframe: {
    fontSize: 9,
    color: '#6B7280',
    marginBottom: 6,
  },
  phaseAction: {
    fontSize: 10,
    color: '#374151',
    marginBottom: 3,
    paddingLeft: 8,
  },
  phaseOutcome: {
    fontSize: 10,
    color: '#065F46',
    fontFamily: 'Helvetica-Bold',
    marginTop: 4,
  },
  quickWin: {
    fontSize: 10,
    color: '#374151',
    marginBottom: 6,
    paddingLeft: 8,
  },
  footer: {
    position: 'absolute',
    bottom: 24,
    left: 48,
    right: 48,
    fontSize: 8,
    color: '#9CA3AF',
    textAlign: 'center',
    borderTop: '1px solid #E5E7EB',
    paddingTop: 8,
  },
});

interface PDFProps {
  analysis: AnalysisResult;
  company: string;
  name: string;
}

export function ProfitLeakPDF({ analysis, company, name }: PDFProps) {
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>AI Profit Leak Report</Text>
          <Text style={styles.headerSub}>
            {company} — Prepared for {name} — {today}
          </Text>
        </View>

        {/* Score Row */}
        <View style={styles.scoreRow}>
          <Text style={styles.scoreBig}>{analysis.aiReadinessScore}%</Text>
          <View style={styles.scoreInfo}>
            <Text style={styles.scoreLabel}>AI Readiness Score</Text>
            <Text style={styles.scoreBadge}>{analysis.scoreLabel}</Text>
          </View>
        </View>

        {/* Savings Banner */}
        <View style={styles.savingsBanner}>
          <Text style={styles.savingsAmount}>
            ${analysis.totalAnnualSavingsMin.toLocaleString()} –{' '}
            ${analysis.totalAnnualSavingsMax.toLocaleString()}
          </Text>
          <Text style={styles.savingsSub}>
            Estimated annual savings opportunity ·{' '}
            {analysis.totalHoursSavedPerYear.toLocaleString()} hours recovered per year
          </Text>
        </View>

        {/* Executive Summary */}
        <Text style={styles.sectionTitle}>Executive Summary</Text>
        <Text style={styles.summaryText}>{analysis.executiveSummary}</Text>

        {/* Profit Leaks */}
        <Text style={styles.sectionTitle}>Identified Profit Leaks</Text>
        {analysis.profitLeaks.map((leak: ProfitLeak) => (
          <View key={leak.rank} style={styles.leakCard}>
            <Text style={styles.leakTitle}>
              #{leak.rank} {leak.title}
            </Text>
            <View style={styles.leakMetrics}>
              <Text style={styles.leakSavings}>
                ${leak.annualSavingsMin.toLocaleString()} – $
                {leak.annualSavingsMax.toLocaleString()}/yr
              </Text>
              <Text style={styles.leakHours}>
                {leak.hoursSavedPerYear.toLocaleString()} hrs/yr saved
              </Text>
            </View>
            <Text style={styles.leakDesc}>{leak.problemDescription}</Text>
            <Text style={styles.leakSolution}>Solution: {leak.aiSolution}</Text>
          </View>
        ))}

        {/* Roadmap */}
        <Text style={styles.sectionTitle}>Implementation Roadmap</Text>
        {analysis.roadmap.map((phase: RoadmapPhase) => (
          <View key={phase.phase} style={styles.roadmapPhase}>
            <Text style={styles.phaseTitle}>
              Phase {phase.phase}: {phase.title}
            </Text>
            <Text style={styles.phaseTimeframe}>{phase.timeframe}</Text>
            {phase.actions.map((action: string, i: number) => (
              <Text key={i} style={styles.phaseAction}>
                • {action}
              </Text>
            ))}
            <Text style={styles.phaseOutcome}>{phase.expectedOutcome}</Text>
          </View>
        ))}

        {/* Quick Wins */}
        <Text style={styles.sectionTitle}>Quick Wins — Start This Week</Text>
        {analysis.quickWins.map((win: string, i: number) => (
          <Text key={i} style={styles.quickWin}>
            {i + 1}. {win}
          </Text>
        ))}

        <Text style={styles.footer}>
          Confidential — AI Profit Leak Report for {company} — Not financial advice
        </Text>
      </Page>
    </Document>
  );
}
