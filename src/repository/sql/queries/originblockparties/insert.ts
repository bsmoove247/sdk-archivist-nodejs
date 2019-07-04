/*
 * File: insert.ts
 * Project: sdk-archivist-nodejs
 * File Created: Tuesday, 16th April 2019 9:19:00 am
 * Author: XYO Development Team (support@xyo.network)
 * -----
 * Last Modified: Sunday, 21st April 2019 1:55:05 pm
 * Modified By: XYO Development Team (support@xyo.network>)
 * -----
 * Copyright 2017 - 2019 XY - The Persistent Company
 */

import { SqlQuery } from '../query'
import { SqlService } from '../../sql-service'
import _ from 'lodash'

export class InsertOriginBlockPartiesQuery extends SqlQuery {

  constructor(sql: SqlService) {
    super(sql, `
      INSERT INTO OriginBlockParties (
        originBlockId,
        positionalIndex,
        blockIndex,
        bridgeHashSet,
        payloadBytes,
        nextPublicKeyId,
        previousOriginBlockHash,
        previousOriginBlockPartyId
      )
      VALUES
        (?, ?, ?, ?, ?, ?, ?, ?);
    `)
  }

  public async send(
    { originBlockId,
      positionalIndex,
      blockIndex,
      bridgeHashSet,
      payloadBytes,
      nextPublicKeyId,
      previousOriginBlockHash,
      previousOriginBlockPartyId }:
      { originBlockId: number,
        positionalIndex: number,
        blockIndex: number,
        bridgeHashSet: string | undefined,
        payloadBytes: Buffer,
        nextPublicKeyId: number | undefined,
        previousOriginBlockHash: string | undefined,
        previousOriginBlockPartyId: number | undefined }
  ) {
    return (await this.sql.query<{insertId: number}>(
      this.query,
      [
        originBlockId,
        positionalIndex,
        blockIndex,
        bridgeHashSet,
        payloadBytes,
        nextPublicKeyId,
        previousOriginBlockHash,
        previousOriginBlockPartyId
      ]
    )).insertId
  }
}