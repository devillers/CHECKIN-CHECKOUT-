// components/PDFGenerator.js
'use client'

import React from 'react'
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  PDFDownloadLink,
} from '@react-pdf/renderer'

// Styles PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: 'Helvetica',
  },
  section: { marginBottom: 15 },
  header: { fontSize: 18, marginBottom: 10 },
  table: { display: 'table', width: 'auto', marginTop: 10 },
  row: { flexDirection: 'row' },
  cellHeader: {
    width: '25%',
    padding: 5,
    fontWeight: 'bold',
    backgroundColor: '#eee',
  },
  cell: { width: '25%', padding: 5 },
  signature: { marginTop: 20, width: 150 },
})

// Composant PDF
const InventoryPDF = ({ logement, mode, userEmail, items, signature }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>
          {mode === 'checkin' ? 'Check-in' : 'Checkout'} – Inventaire
        </Text>
        <Text>Logement : {logement}</Text>
        <Text>Utilisateur : {userEmail}</Text>
        <Text>Date : {new Date().toLocaleString('fr-FR')}</Text>
      </View>

      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={styles.cellHeader}>Élément</Text>
          <Text style={styles.cellHeader}>État</Text>
          <Text style={styles.cellHeader}>Commentaire</Text>
          <Text style={styles.cellHeader}>Photo</Text>
        </View>
        {items.map((item, i) => (
          <View key={i} style={styles.row}>
            <Text style={styles.cell}>{item.nom}</Text>
            <Text style={styles.cell}>{item.status === 'ok' ? 'OK' : 'PAS OK'}</Text>
            <Text style={styles.cell}>{item.comment || ''}</Text>
            <Text style={styles.cell}>{item.photoUrl ? '📸' : ''}</Text>
          </View>
        ))}
      </View>

      {signature && (
        <View style={styles.section}>
          <Text>Signature :</Text>
          <Image src={signature} style={styles.signature} />
        </View>
      )}
    </Page>
  </Document>
)

export const PDFGenerator = ({ data }) => (
  <PDFDownloadLink
    document={<InventoryPDF {...data} />}
    fileName={`inventaire-${data.mode}-${data.logement}.pdf`}
    className="bg-blue-600 text-white px-4 py-2 rounded inline-block"
  >
    {({ loading }) => (loading ? 'Génération PDF...' : 'Télécharger PDF')}
  </PDFDownloadLink>
)
